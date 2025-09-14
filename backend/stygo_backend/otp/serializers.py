from rest_framework import serializers

class EmailPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True, min_length=4)
    is_signup = serializers.BooleanField(default=False, required=False)
    
    def validate(self, data):
        email = data.get('email', '').strip()
        is_signup = data.get('is_signup', False)
        
        if not email:
            raise serializers.ValidationError({"email": "Email is required"})
            
        return data


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)


class PasswordResetConfirmSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    code = serializers.CharField(required=True, max_length=6)
    new_password = serializers.CharField(required=True, min_length=4, write_only=True)
