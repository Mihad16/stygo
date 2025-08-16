from django.contrib.auth.models import User
from django.db import models
from django.utils.text import slugify

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
    slug = models.SlugField(unique=True, editable=True, blank=True)
    location = models.CharField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='men')
    logo = models.ImageField(upload_to='shop_logos/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Auto-generate slug only if it's empty
        if not self.slug:
            base_slug = slugify(self.shop_name)
            slug = base_slug
            counter = 1
            # Ensure slug uniqueness
            while SellerProfile.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.shop_name
