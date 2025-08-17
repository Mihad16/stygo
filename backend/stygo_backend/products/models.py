from django.db import models
from sellers.models import SellerProfile  # assuming seller has a FK user

class Product(models.Model):
    # Subcategory choices based on main categories
    SUBCATEGORY_CHOICES = [
        # Men's subcategories
        ('men_shirts', 'Shirts'),
        ('men_tshirts', 'T-Shirts'),
        ('men_pants', 'Pants'),
        ('men_jeans', 'Jeans'),
        ('men_shorts', 'Shorts'),
        ('men_jackets', 'Jackets'),
        ('men_shoes', 'Shoes'),
        ('men_accessories', 'Accessories'),
        
        # Women's subcategories
        ('women_tops', 'Tops'),
        ('women_dresses', 'Dresses'),
        ('women_pants', 'Pants'),
        ('women_jeans', 'Jeans'),
        ('women_skirts', 'Skirts'),
        ('women_jackets', 'Jackets'),
        ('women_shoes', 'Shoes'),
        ('women_bags', 'Bags'),
        ('women_jewelry', 'Jewelry'),
        
        # Kids subcategories
        ('kids_boys_clothing', 'Boys Clothing'),
        ('kids_girls_clothing', 'Girls Clothing'),
        ('kids_shoes', 'Kids Shoes'),
        ('kids_toys', 'Toys'),
        ('kids_accessories', 'Kids Accessories'),
        
        # Accessories subcategories
        ('accessories_bags', 'Bags'),
        ('accessories_jewelry', 'Jewelry'),
        ('accessories_watches', 'Watches'),
        ('accessories_sunglasses', 'Sunglasses'),
        ('accessories_belts', 'Belts'),
        ('accessories_hats', 'Hats'),
        
        # Beauty subcategories
        ('beauty_skincare', 'Skincare'),
        ('beauty_makeup', 'Makeup'),
        ('beauty_haircare', 'Hair Care'),
        ('beauty_fragrances', 'Fragrances'),
        ('beauty_tools', 'Beauty Tools'),
    ]

    seller = models.ForeignKey(SellerProfile, on_delete=models.CASCADE, related_name="products")
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField( max_digits=10, decimal_places=2, help_text="Original price before discount", null=True,
    blank=True, )
    size = models.CharField(max_length=20)
    category = models.CharField(max_length=50, choices=SUBCATEGORY_CHOICES, help_text="Product subcategory", null=True, blank=True)
    image = models.ImageField(upload_to="products/")
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True, null=True) 

    def __str__(self):
        return self.name
