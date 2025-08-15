from django.db import models
from sellers.models import SellerProfile  # assuming seller has a FK user

class Product(models.Model):
    seller = models.ForeignKey(SellerProfile, on_delete=models.CASCADE, related_name="products")
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField( max_digits=10, decimal_places=2, help_text="Original price before discount", null=True,
    blank=True, )
    size = models.CharField(max_length=20)
    image = models.ImageField(upload_to="products/")
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True, null=True) 

    def __str__(self):
        return self.name
