from django.urls import path
from .views import (
    create_product,
    my_products,
    all_products,
    products_by_shop,
    ProductDetailAPIView,
)

urlpatterns = [
    path('create/', create_product),             # POST: create product
    path('my/', my_products),                    # GET: seller's own products
    path('all/', all_products),                  # GET: all products (public)
    path('shop/<str:shop_name>/', products_by_shop),  # GET: products by shop
    path('<int:pk>/', ProductDetailAPIView.as_view(), name='product-detail'), ]