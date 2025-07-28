from rest_framework import serializers
from .models import SellerProfile

class SellerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerProfile
        fields = ['shop_name', 'location', 'phone_number']
