from rest_framework import serializers
from .models import SellerProfile

class SellerProfileSerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()

    class Meta:
        model = SellerProfile
        fields = ['shop_name', 'slug', 'location', 'phone_number', 'category', 'logo', 'created_at']

    def get_logo(self, obj):
        request = self.context.get('request')
        if obj.logo and hasattr(obj.logo, 'url') and request:
            return request.build_absolute_uri(obj.logo.url)
        return None
