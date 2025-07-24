from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta
from rest_framework_simplejwt.tokens import RefreshToken  # ✅ New import

from .models import OTP
from .serializers import SendOTPSerializer, VerifyOTPSerializer


# ✅ Helper to generate JWT tokens
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class SendOTPView(APIView):
    def post(self, request):
        serializer = SendOTPSerializer(data=request.data)
        if serializer.is_valid():
            phone = serializer.validated_data['phone']

            # Ensure it starts with +91
            if not phone.startswith('+91'):
                phone = '+91' + phone

            # Generate new OTP
            code = OTP.generate_code()

            # ✅ Update existing OTP or create new
            existing_otp = OTP.objects.filter(phone=phone).last()
            if existing_otp:
                existing_otp.code = code
                existing_otp.created_at = timezone.now()
                existing_otp.save()
            else:
                OTP.objects.create(phone=phone, code=code)

            print(f"📲 OTP for {phone}: {code}")
            return Response({"message": "OTP sent"}, status=200)

        return Response(serializer.errors, status=400)


class VerifyOTPView(APIView):
    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        if serializer.is_valid():
            phone = serializer.validated_data['phone']
            code = serializer.validated_data['otp']

            # Normalize phone number
            if not phone.startswith('+91'):
                phone = '+91' + phone

            # Only allow OTPs created in last 5 minutes
            time_limit = timezone.now() - timedelta(minutes=5)

            otp_obj = OTP.objects.filter(phone=phone, code=code, created_at__gte=time_limit).last()

            if not otp_obj:
                return Response({"error": "Invalid or expired OTP"}, status=400)

            # ✅ Create or get user
            user, _ = User.objects.get_or_create(username=phone)

            # ✅ Return JWT tokens instead of Token model
            tokens = get_tokens_for_user(user)

            return Response({
                "access": tokens["access"],
                "refresh": tokens["refresh"],
                "user_id": user.id,
                "phone": user.username
            }, status=200)

        return Response(serializer.errors, status=400)
     
