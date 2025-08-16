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



@api_view(['GET'])
def get_shop_by_slug(request, shop_slug):
    try:
        shop = SellerProfile.objects.get(slug=shop_slug)
        serializer = SellerProfileSerializer(shop, context={'request': request})
        return Response(serializer.data)
    except SellerProfile.DoesNotExist:
        return Response({'error': 'Shop not found'}, status=status.HTTP_404_NOT_FOUND)
@api_view(['PUT'])
def update_shop(request):
    user = request.user
    try:
        profile = SellerProfile.objects.get(user=user)
    except SellerProfile.DoesNotExist:
        return Response({'error': 'Shop not found'}, status=status.HTTP_404_NOT_FOUND)

    data = request.data
    profile.shop_name = data.get('shop_name', profile.shop_name)
    profile.slug = data.get('slug', profile.slug)
    profile.location = data.get('location', profile.location)
    profile.category = data.get('category', profile.category)

    # Handle logo upload
    if 'logo' in request.FILES:
        profile.logo = request.FILES['logo']

    profile.save()
    serializer = SellerProfileSerializer(profile, context={'request': request})
    return Response(serializer.data)
