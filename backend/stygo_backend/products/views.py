from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
from sellers.models import SellerProfile
from rest_framework.generics import RetrieveAPIView
from .serializers import ProductSerializer

# ✅ Create a product
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_product(request):
    user = request.user

    try:
        shop = SellerProfile.objects.get(user=user)
    except SellerProfile.DoesNotExist:
        return Response({'error': 'Shop not found'}, status=404)

    # ✅ Limit: one shop can only have 9 products
    if Product.objects.filter(seller=shop).count() >= 10:
        return Response({'error': 'Product limit reached (max 10 products)'}, status=400)

    data = request.data.copy()
    data['seller'] = shop.id

    serializer = ProductSerializer(data=data, context={"request": request})
    if serializer.is_valid():
        serializer.save(seller=shop)
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=400)

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

# ✅ List products by shop name (public)
@api_view(['GET'])
def products_by_shop(request, shop_name):
    try:
        seller_profile = SellerProfile.objects.get(shop_name=shop_name)
    except SellerProfile.DoesNotExist:
        return Response({"error": "Shop not found"}, status=404)

    products = Product.objects.filter(seller=seller_profile)
    serializer = ProductSerializer(products, many=True, context={"request": request})
    return Response(serializer.data)


class ProductDetailAPIView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "pk"  # or "id" if that's your field


@api_view(['GET'])
def top_products_by_shop(request, shop_slug):
    try:
        shop = SellerProfile.objects.get(shop_slug=shop_slug)
    except SellerProfile.DoesNotExist:
        return Response({'error': 'Shop not found'}, status=404)

    top_products = Product.objects.filter(seller=shop).order_by('-views')[:10]  # or use any metric
    serializer = ProductSerializer(top_products, many=True, context={"request": request})
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