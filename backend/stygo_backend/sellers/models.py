from django.contrib.auth.models import User
from django.db import models

class SellerProfile(models.Model):
    CATEGORY_CHOICES = [
        ('men', 'Men'),
        ('women', 'Women'),
        ('kids', 'Kids'),
        ('accessories', 'Accessories'),
        ('beauty', 'Beauty'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="seller")
    shop_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='men')
    
    # ✅ New fields
    logo = models.ImageField(upload_to='shop_logos/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.shop_name
