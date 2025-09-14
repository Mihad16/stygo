from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password
from django.utils import timezone
from django.core.mail import send_mail
from rest_framework_simplejwt.tokens import RefreshToken
from .models import OTP, PasswordResetToken
from .serializers import (
    EmailPasswordSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer
)
import random
from datetime import timedelta

# JWT token generator
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


def send_password_reset_email(email, token):
    subject = 'Your Stygo Password Reset Code'
    
    # HTML email template
    html_message = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #4F46E5; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Stygo</h1>
        </div>
        <div style="padding: 20px;">
            <h2>Password Reset Request</h2>
            <p>You recently requested to reset your password for your Stygo account. Use the following code to complete the process:</p>
            
            <div style="background-color: #F3F4F6; padding: 15px; text-align: center; margin: 20px 0; font-size: 24px; letter-spacing: 2px;">
                {token}
            </div>
            
            <p>This code will expire in 10 minutes. If you didn't request this, please ignore this email or contact support if you have any concerns.</p>
            
            <p>Thanks,<br>The Stygo Team</p>
        </div>
        <div style="background-color: #F3F4F6; padding: 15px; text-align: center; font-size: 12px; color: #6B7280;">
            &copy; {timezone.now().year} Stygo. All rights reserved.
        </div>
    </div>
    """
    
    # Plain text version
    plain_message = f"""
    Password Reset Request
    ---------------------
    
    You recently requested to reset your password for your Stygo account.
    
    Your verification code is: {token}
    
    This code will expire in 10 minutes.
    
    If you didn't request this, please ignore this email or contact support.
    
    Thanks,
    The Stygo Team
    """
    
    from_email = 'Stygo <noreply@stygo.in>'
    recipient_list = [email]
    
    try:
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=from_email,
            recipient_list=recipient_list,
            html_message=html_message,
            fail_silently=False
        )
        print(f"Password reset email sent to {email}")
    except Exception as e:
        print(f"Failed to send email to {email}: {str(e)}")
        # Re-raise the exception to be handled by the view
        raise

class EmailPasswordLoginView(APIView):
    def post(self, request):
        serializer = EmailPasswordSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        is_signup = serializer.validated_data.get('is_signup', False)
        
        try:
            if is_signup:
                # For signup, check if email already exists
                if User.objects.filter(email=email).exists():
                    return Response({"error": "User with this email already exists"},
                                  status=status.HTTP_400_BAD_REQUEST)
                
                # Create new user with email as username
                user = User.objects.create_user(
                    username=email,
                    password=password,
                    email=email
                )
            else:
                # For login, find user by email
                try:
                    user = User.objects.get(email=email)
                except User.DoesNotExist:
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
        
        email = serializer.validated_data['email']
        
        try:
            # Find user by email
            user = User.objects.get(email=email)
            
            # Generate a 6-digit OTP
            otp = str(random.randint(100000, 999999))
            
            # Create or update OTP record
            otp_record, created = OTP.objects.update_or_create(
                email=email,
                defaults={
                    'code': otp,
                    'created_at': timezone.now(),
                    'is_used': False
                }
            )
            
            # Send the OTP via email
            send_password_reset_email(email, otp)
            
            return Response({
                "message": "OTP sent to your email",
                "email": email  # Return email for frontend to use in the next step
            })
            
        except User.DoesNotExist:
            # Don't reveal that the email doesn't exist for security reasons
            return Response({"message": "If your email exists, you will receive an OTP"}, status=status.HTTP_200_OK)


class PasswordResetConfirmView(APIView):
    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        email = serializer.validated_data['email']
        code = serializer.validated_data['code']
        new_password = serializer.validated_data['new_password']
        
        try:
            # Find user by email
            user = User.objects.get(email=email)
            
            # Find valid OTP (not used and not expired - valid for 10 minutes)
            time_threshold = timezone.now() - timedelta(minutes=10)
            otp_record = OTP.objects.filter(
                email=email,
                code=code,
                created_at__gte=time_threshold,
                is_used=False
            ).first()
            
            if not otp_record:
                return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Update password
            user.set_password(new_password)
            user.save()
            
            # Mark OTP as used
            otp_record.is_used = True
            otp_record.save()
            
            return Response({"message": "Password has been reset successfully"})
            
        except User.DoesNotExist:
            # For security, don't reveal that the email doesn't exist
            return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)
