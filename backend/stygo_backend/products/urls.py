from django.urls import path
from .views import (
    create_product,
    my_products,
    all_products,
    ProductDetailAPIView,
    top_products_by_shop,
    delete_product,
    update_product,
    products_under_599,
    latest_products,
    products_by_seller,
  
    
)

urlpatterns = [
    path('create/', create_product),             # POST: create product
    path('my/', my_products),                    # GET: seller's own products
    path('all/', all_products),                  # GET: all products (public)
    path('<int:pk>/', ProductDetailAPIView.as_view(), name='product-detail'), 
     path("shop/<str:shop_slug>/latest-products/", top_products_by_shop, name="top_products_by_shop"),
     path('products/under-599/', products_under_599, name='products_under_599'),
     path('<int:product_id>/delete/', delete_product, name='delete-product'),
    path('<int:product_id>/update/', update_product, name='update-product'),
    path('products/latest/', latest_products, name='latest_products'),
     path('products/seller/<slug:seller_slug>/', products_by_seller, name='products-by-seller'),
    ]
