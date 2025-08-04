from django.urls import path
from .views import create_shop, dashboard, list_all_shops,get_shop_by_slug

urlpatterns = [
    path('create-shop/', create_shop),
    path('dashboard/', dashboard, name='dashboard'),
    path('shops/', list_all_shops),
    path('<slug:shop_slug>/', get_shop_by_slug, name='get_shop_by_slug'),
]
