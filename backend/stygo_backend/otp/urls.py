from django.urls import path
from .views import SendOTPView, VerifyOTPView

urlpatterns = [
    path('send-otp/', SendOTPView.as_view()),
    path('verify/', VerifyOTPView.as_view()),
]
