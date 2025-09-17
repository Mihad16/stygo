from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import SellerProfile
from .serializers import SellerProfileSerializer

# ✅ 1. Create Shop (for seller)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def create_shop(request):
    user = request.user

    if hasattr(user, 'seller'):
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
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def update_shop(request):
    user = request.user
    try:
        profile = SellerProfile.objects.get(user=user)
    except SellerProfile.DoesNotExist:
        return Response({'error': 'Shop not found'}, status=404)

    data = request.data
    serializer = SellerProfileSerializer(profile, data=data, partial=True, context={'request': request})
    
    if serializer.is_valid():
        # Handle logo update if provided
        if 'logo' in request.FILES:
            profile.logo = request.FILES['logo']
        serializer.save()
        return Response(serializer.data)
    
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_shop(request):
    user = request.user
    try:
        profile = SellerProfile.objects.get(user=user)
        
        # Delete the shop and related data
        # Note: This will cascade delete related products due to on_delete=CASCADE
        user.delete()  
        
        return Response({'status': 'Shop and all related data deleted successfully'}, status=200)
    except SellerProfile.DoesNotExist:
        return Response({'error': 'Shop not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
