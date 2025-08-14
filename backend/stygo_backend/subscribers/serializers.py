from rest_framework import serializers
from .models import WhatsAppSubscriber
import phonenumbers
zip

class WhatsAppSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhatsAppSubscriber
        fields = ['phone_number', 'name', 'consent']
        extra_kwargs = {
            'phone_number': {'required': True},
            'consent': {'required': True}
        }

    def validate_phone_number(self, value):
        try:
            parsed = phonenumbers.parse(value, None)
            if not phonenumbers.is_valid_number(parsed):
                raise serializers.ValidationError("Invalid phone number")
            return phonenumbers.format_number(
                parsed, 
                phonenumbers.PhoneNumberFormat.E164
            )
        except:
            raise serializers.ValidationError("Invalid phone number format")