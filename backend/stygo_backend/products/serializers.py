from rest_framework import serializers
from .models import Product, ProductImage

class ProductImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'image_url', 'is_primary']
        read_only_fields = ['is_primary']
    
    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and hasattr(obj.image, 'url') and request:
            return request.build_absolute_uri(obj.image.url)
        return None

class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    images = ProductImageSerializer(many=True, read_only=True)
    image = serializers.ImageField(required=False)  # Make main image optional
    image_files = serializers.ListField(
        child=serializers.ImageField(max_length=100000, allow_empty_file=False, use_url=False),
        write_only=True,
        required=False
    )

    class Meta:
        model = Product
        fields = [
            "id", "name", "price", "original_price", "size", "category",
            "description", "image", "image_url", "created_at", "images", "image_files"
        ]
        read_only_fields = ['images']

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and hasattr(obj.image, 'url') and request:
            return request.build_absolute_uri(obj.image.url)
        return None
    
    def create(self, validated_data):
        image_files = validated_data.pop('image_files', None) or []
        
        # Create the product first
        product = super().create(validated_data)
        
        # Create ProductImage instances for each uploaded image
        for img in image_files:
            ProductImage.objects.create(product=product, image=img)
        
        # Set the first image as the main product image if any images were uploaded
        if image_files:
            first_image = product.images.first()
            if first_image:
                product.image = first_image.image
                product.save()
        
        return product
    
    def update(self, instance, validated_data):
        image_files = validated_data.pop('image_files', None) or []
        
        # Handle new image uploads if any
        if image_files:
            for img in image_files:
                ProductImage.objects.create(product=instance, image=img)
            
            # Update the main product image if it's the first update
            if not instance.image:
                first_image = instance.images.first()
                if first_image:
                    validated_data['image'] = first_image.image
        
        return super().update(instance, validated_data)
