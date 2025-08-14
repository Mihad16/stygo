from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import WhatsAppSubscriber
from .serializers import WhatsAppSubscriberSerializer

@api_view(["POST"])
@permission_classes([AllowAny])
def subscribe(request):
    serializer = WhatsAppSubscriberSerializer(data=request.data)

    if not serializer.is_valid():
        print("Serializer errors:", serializer.errors)  # Debug line
        return Response({"success": False, "errors": serializer.errors}, status=400)

    phone_number = serializer.validated_data["phone_number"]
    name = serializer.validated_data.get("name", "")
    consent = serializer.validated_data["consent"]

    if not consent:
        return Response({"success": False, "message": "Consent is required"}, status=400)

    subscriber, created = WhatsAppSubscriber.objects.get_or_create(
        phone_number=phone_number,
        defaults={"name": name, "consent": consent, "is_active": True}
    )

    if not created:
        return Response({"success": False, "message": "This number is already subscribed"}, status=400)

    return Response({"success": True, "message": "Successfully subscribed to WhatsApp updates"})
