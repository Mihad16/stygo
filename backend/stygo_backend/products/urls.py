from django.urls import path
from .views import (
    create_product,
    my_products,
    all_products,
    products_by_shop,
    ProductDetailAPIView,
    top_products_by_shop,
    delete_product,
    update_product
  
    
)

urlpatterns = [
    path('create/', create_product),             # POST: create product
    path('my/', my_products),                    # GET: seller's own products
    path('all/', all_products),                  # GET: all products (public)
    path('shop/<str:shop_name>/', products_by_shop),  # GET: products by shop///////////
    path('<int:pk>/', ProductDetailAPIView.as_view(), name='product-detail'), 
     path("shop/<str:shop_slug>/latest-products/", top_products_by_shop, name="top_products_by_shop"),
    
     path('<int:product_id>/delete/', delete_product, name='delete-product'),
    path('<int:product_id>/update/', update_product, name='update-product'),

    ]
