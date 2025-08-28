from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
import random

User = get_user_model()

class OTP(models.Model):
    phone = models.CharField(max_length=15)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.phone} - {self.code}"

    @staticmethod
    def generate_code():
        return str(random.randint(100000, 999999))


class PasswordResetToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.token}"

    class Meta:
        ordering = ['-created_at']
