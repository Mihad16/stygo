from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import SellerProfile
from .serializers import SellerProfileSerializer

# ✅ 1. Create Shop (for seller)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_shop(request):
    user = request.user

    if hasattr(user, 'sellerprofile'):
        return Response({'error': 'Shop already exists'}, status=400)

    data = request.data
    shop_name = data.get('shop_name')
    location = data.get('location')
    category = data.get('category')
    logo = request.FILES.get('logo')  # ✅ handle image upload

    if not shop_name:
        return Response({'error': 'Shop name is required'}, status=400)
    if not category:
        return Response({'error': 'Category is required'}, status=400)

    SellerProfile.objects.create(
        user=user,
        shop_name=shop_name,
        location=location or "",
        phone_number=user.username,
        category=category,
        logo=logo  # ✅ save image
    )

    return Response({'status': 'Shop created successfully'})


# ✅ 2. Seller Dashboard
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    user = request.user

    try:
        profile = SellerProfile.objects.get(user=user)
        serializer = SellerProfileSerializer(profile, context={'request': request})  # ✅ context added
        return Response(serializer.data)
    except SellerProfile.DoesNotExist:
        return Response({'error': 'Shop not found'}, status=404)


# ✅ 3. List All Shops (for buyers/public)
@api_view(['GET'])
def list_all_shops(request):
    shops = SellerProfile.objects.all()
    serializer = SellerProfileSerializer(shops, many=True, context={'request': request})  # ✅ context added
    return Response(serializer.data)
