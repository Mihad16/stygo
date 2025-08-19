from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import SuggestionSerializer
from .models import Suggestion


class SuggestionListCreateView(APIView):
    """POST open to all for feedback submissions.
    GET restricted to admin users to read submissions.
    """

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    def get(self, request):
        qs = Suggestion.objects.all()
        serializer = SuggestionSerializer(qs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SuggestionSerializer(data=request.data)
        if serializer.is_valid():
            suggestion = serializer.save()
            return Response(SuggestionSerializer(suggestion).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
