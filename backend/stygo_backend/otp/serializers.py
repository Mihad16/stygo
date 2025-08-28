from rest_framework import serializers

class PhonePasswordSerializer(serializers.Serializer):
    phone = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    password = serializers.CharField(required=True, write_only=True, min_length=4)
    is_signup = serializers.BooleanField(default=False, required=False)
    
    def validate(self, data):
        phone = data.get('phone', '').strip()
        email = data.get('email', '').strip()
        is_signup = data.get('is_signup', False)
        
        # For signup, we need both phone and email
        if is_signup:
            if not phone:
                raise serializers.ValidationError({"phone": "Phone number is required for signup"})
            if not email:
                raise serializers.ValidationError({"email": "Email is required for signup"})
        # For login, we need either phone or email
        elif not phone and not email:
            raise serializers.ValidationError("Either phone or email is required")
            
        return data

    def validate_phone(self, value):
        if not value:
            return value
            
        # Remove any non-digit characters
        phone = ''.join(filter(str.isdigit, value))
        
        # Ensure phone is 10 digits (for Indian numbers)
        if len(phone) != 10:
            raise serializers.ValidationError("Phone number must be 10 digits")
            
        return phone


class PasswordResetRequestSerializer(serializers.Serializer):
    phone = serializers.CharField(required=True)

    def validate_phone(self, value):
        # Remove any non-digit characters
        phone = ''.join(filter(str.isdigit, value))
        
        # Ensure phone is 10 digits (for Indian numbers)
        if len(phone) != 10:
            raise serializers.ValidationError("Phone number must be 10 digits")
            
        return phone


class PasswordResetConfirmSerializer(serializers.Serializer):
    phone = serializers.CharField(required=True)
    token = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=4, write_only=True)

    def validate_phone(self, value):
        # Remove any non-digit characters
        phone = ''.join(filter(str.isdigit, value))
        
        # Ensure phone is 10 digits (for Indian numbers)
        if len(phone) != 10:
            raise serializers.ValidationError("Phone number must be 10 digits")
            
        return phone
