from rest_framework import serializers
from .models import WhatsAppSubscriber

class WhatsAppSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhatsAppSubscriber
        fields = ['phone_number', 'name']

    def validate_phone_number(self, value):
        if not value.startswith("+"):
            raise serializers.ValidationError("Phone number must start with + and include country code.")
        return value
