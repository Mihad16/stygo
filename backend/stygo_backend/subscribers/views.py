from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import WhatsAppSubscriber
from .serializers import WhatsAppSubscriberSerializer

class WhatsAppSubscribeView(APIView):
    def post(self, request):
        serializer = WhatsAppSubscriberSerializer(data=request.data)
        if serializer.is_valid():
            phone_number = serializer.validated_data['phone_number']

            # Prevent duplicates
            if WhatsAppSubscriber.objects.filter(phone_number=phone_number).exists():
                return Response(
                    {"message": "This phone number is already subscribed."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            serializer.save()
            return Response(
                {"message": "Subscribed successfully!"},
                status=status.HTTP_201_CREATED
            )

        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
