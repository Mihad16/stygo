from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
from sellers.models import SellerProfile
from rest_framework.generics import RetrieveAPIView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .serializers import ProductSerializer
from rest_framework.generics import get_object_or_404
from rest_framework import status
import cloudinary
from cloudinary.exceptions import AuthorizationRequired, Error as CloudinaryError

# ✅ Create a product
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def create_product(request):
    user = request.user

    try:
        shop = SellerProfile.objects.get(user=user)
    except SellerProfile.DoesNotExist:
        return Response({'error': 'Shop not found'}, status=404)

    # ✅ Limit: one shop can only have 9 products
    if Product.objects.filter(seller=shop).count() >= 10:
        return Response({'error': 'Product limit reached (max 10 products)'}, status=400)

    # (debug logging removed)

    # Convert FILES to list of images for the serializer
    data = request.data.copy()
    
    # Handle image uploads if any
    if 'image' in request.FILES or 'image_files' in request.FILES:
        if 'image_files' not in request.FILES:
            # If using single image upload for backward compatibility
            data.setlist('image_files', [request.FILES['image']])
        else:
            # If using multiple image upload
            data.setlist('image_files', request.FILES.getlist('image_files'))
    # If no images, that's fine now as we've made the image field optional
    
    # Log the incoming data for debugging
    print("Incoming data:", data)
    print("Files received:", request.FILES)
    
    # Use the processed data with the serializer
    serializer = ProductSerializer(data=data, context={"request": request})
    
    # Log validation errors if any
    if not serializer.is_valid():
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=400)
    
    # If valid, proceed with saving
    try:
        instance = serializer.save(seller=shop)
        # (post-save diagnostics removed)
        return Response(serializer.data)
    except AuthorizationRequired as e:
        # Cloudinary credentials are wrong/missing – treat as client/config error, not server crash
        return Response({
            'error': 'Cloudinary authorization failed. Please verify CLOUDINARY_URL on the server.',
            'code': 'cloudinary_auth',
            'detail': str(e),
        }, status=400)
    except CloudinaryError as e:
        # Other Cloudinary-side errors (e.g., invalid file)
        return Response({
            'error': 'Image upload failed.',
            'code': 'cloudinary_error',
            'detail': str(e),
        }, status=422)
    except Exception as e:
        # Unknown server-side error
        return Response({
            'error': 'Failed to save product (server error).',
            'detail': str(e),
        }, status=500)

# ✅ List products of logged-in seller
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_products(request):
    user = request.user

    try:
        seller_profile = SellerProfile.objects.get(user=user)
    except SellerProfile.DoesNotExist:
        return Response({'error': 'Shop not found'}, status=404)

    products = Product.objects.filter(seller=seller_profile)
    serializer = ProductSerializer(products, many=True, context={"request": request})
    return Response(serializer.data)

# ✅ List all products (public)
@api_view(['GET'])
def all_products(request):
    products = Product.objects.all().order_by('-id')
    serializer = ProductSerializer(products, many=True, context={"request": request})
    return Response(serializer.data)





class ProductDetailAPIView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "pk"  # or "id" if that's your field



@api_view(['GET'])
def top_products_by_shop(request, shop_slug):
    try:
        shop = SellerProfile.objects.get(slug=shop_slug)  # ✅ changed shop_slug -> slug
    except SellerProfile.DoesNotExist:
        return Response({'error': 'Shop not found'}, status=404)

    latest_products = Product.objects.filter(seller=shop).order_by('-created_at')[:3]
    serializer = ProductSerializer(latest_products, many=True, context={"request": request})
    return Response(serializer.data)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_product(request, product_id):
    user = request.user

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)

    # Check if the logged-in user is the owner of the product
    if product.seller.user != user:
        return Response({'error': 'Not authorized to delete this product'}, status=403)

    product.delete()
    return Response({'message': 'Product deleted successfully'}, status=200)





@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def update_product(request, product_id):
    user = request.user
    product = get_object_or_404(Product, id=product_id)

    if product.seller.user != user:
        return Response({'error': 'Not authorized to update this product'}, status=403)

    # Process image files if any
    data = request.data.copy()
    if 'image_files' in request.FILES:
        data.setlist('image_files', request.FILES.getlist('image_files'))
    
    serializer = ProductSerializer(
        product, 
        data=data, 
        partial=True, 
        context={"request": request}
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


# Get products under 599
@api_view(['GET'])
def products_under_599(request):
    products = Product.objects.filter(price__lte=599).order_by('-created_at')
    serializer = ProductSerializer(products, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def latest_products(request, limit=30):  # default limit 30

    try:
        limit = int(limit)
        if limit > 100:  # optional safety limit
            limit = 100
    except:
        limit = 30

    products = Product.objects.all().order_by('-created_at')[:limit]
    serializer = ProductSerializer(products, many=True, context={"request": request})
    return Response(serializer.data)



@api_view(['GET'])
def products_by_seller(request, seller_slug):
    """
    Fetch all products for a seller using seller slug.
    """
    try:
        seller = SellerProfile.objects.get(slug=seller_slug)
    except SellerProfile.DoesNotExist:
        return Response({"detail": "Seller not found"}, status=status.HTTP_404_NOT_FOUND)

    products = Product.objects.filter(seller=seller).order_by('-created_at')
    serializer = ProductSerializer(products, many=True, context={'request': request})

    return Response(serializer.data)