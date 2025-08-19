from rest_framework import serializers
from .models import Suggestion


class SuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suggestion
        fields = [
            "id",
            "name",
            "email",
            "language",
            "message",
            "page_path",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def validate_message(self, value: str) -> str:
        if not value or len(value.strip()) < 5:
            raise serializers.ValidationError("Message is too short.")
        return value.strip()
