from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.utils.crypto import get_random_string
from django.core.mail import send_mail
from rest_framework_simplejwt.tokens import RefreshToken
from sellers.models import SellerProfile
from .models import PasswordResetToken
from .serializers import (
    PhonePasswordSerializer, 
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer
)

# JWT token generator
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


def send_password_reset_email(email, token):
    subject = 'Password Reset Request'
    message = f'Your password reset token is: {token}'
    from_email = 'noreply@stygo.in'  # Update with your email
    recipient_list = [email]
    
    # In production, you would use an email service
    print(f"Password reset token for {email}: {token}")
    # Uncomment to send actual email in production
    # send_mail(subject, message, from_email, recipient_list, fail_silently=False)

class PhonePasswordLoginView(APIView):
    def post(self, request):
        serializer = PhonePasswordSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        phone = serializer.validated_data.get('phone', '').strip()
        email = serializer.validated_data.get('email', '').strip()
        password = serializer.validated_data['password']
        is_signup = serializer.validated_data.get('is_signup', False)
        
        try:
            if is_signup:
                # For signup, we require both phone and email
                if not phone or not email:
                    return Response({"error": "Both phone and email are required for signup"}, 
                                  status=status.HTTP_400_BAD_REQUEST)
                
                # Normalize phone number
                phone = ''.join(filter(str.isdigit, phone))
                if not phone.startswith('+91'):
                    phone = '+91' + phone
                
                # Check if user already exists
                if User.objects.filter(username=phone).exists():
                    return Response({"error": "User with this phone number already exists"}, 
                                  status=status.HTTP_400_BAD_REQUEST)
                if User.objects.filter(email=email).exists():
                    return Response({"error": "User with this email already exists"},
                                  status=status.HTTP_400_BAD_REQUEST)
                
                # Create new user
                user = User.objects.create_user(
                    username=phone,
                    password=password,
                    email=email
                )
            else:
                # For login, try to find user by email or phone
                user = None
                if email:
                    try:
                        user = User.objects.get(email=email)
                    except User.DoesNotExist:
                        pass
                
                if not user and phone:
                    phone = ''.join(filter(str.isdigit, phone))
                    if not phone.startswith('+91'):
                        phone = '+91' + phone
                    try:
                        user = User.objects.get(username=phone)
                    except User.DoesNotExist:
                        pass
                
                if not user:
                    return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
                
                # Verify password
                if not check_password(password, user.password):
                    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            
            # Generate tokens
            tokens = get_tokens_for_user(user)
            has_shop = SellerProfile.objects.filter(user=user).exists()
            
            return Response({
                "access": tokens["access"],
                "refresh": tokens["refresh"],
                "user_id": user.id,
                "phone": user.username,
                "has_shop": has_shop
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PasswordResetRequestView(APIView):
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        phone = serializer.validated_data['phone']
        if not phone.startswith('+91'):
            phone = '+91' + phone
        
        try:
            user = User.objects.get(username=phone)
            # Generate and save reset token
            token = get_random_string(length=6, allowed_chars='0123456789')
            PasswordResetToken.objects.update_or_create(
                user=user,
                defaults={'token': token, 'is_used': False}
            )
            
            # Send reset token to user's email
            send_password_reset_email(user.email, token)
            
            return Response({"message": "Password reset token sent to your email"}, status=status.HTTP_200_OK)
            
        except User.DoesNotExist:
            # Don't reveal that the user doesn't exist for security reasons
            return Response({"message": "If an account exists with this phone number, a password reset token has been sent"}, 
                          status=status.HTTP_200_OK)


class PasswordResetConfirmView(APIView):
    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        phone = serializer.validated_data['phone']
        token = serializer.validated_data['token']
        new_password = serializer.validated_data['new_password']
        
        if not phone.startswith('+91'):
            phone = '+91' + phone
        
        try:
            user = User.objects.get(username=phone)
            reset_token = PasswordResetToken.objects.filter(
                user=user, 
                token=token,
                is_used=False
            ).first()
            
            if not reset_token:
                return Response({"error": "Invalid or expired token"}, 
                              status=status.HTTP_400_BAD_REQUEST)
            
            # Update password
            user.set_password(new_password)
            user.save()
            
            # Mark token as used
            reset_token.is_used = True
            reset_token.save()
            
            return Response({"message": "Password has been reset successfully"}, 
                          status=status.HTTP_200_OK)
            
        except User.DoesNotExist:
            return Response({"error": "User not found"}, 
                          status=status.HTTP_404_NOT_FOUND)
