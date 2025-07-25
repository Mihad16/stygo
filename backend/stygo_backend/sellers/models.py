from django.contrib.auth.models import User
from django.db import models

class SellerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    shop_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.shop_name
