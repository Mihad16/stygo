from django.urls import path
from .views import create_shop, dashboard, list_all_shops, public_shop_view

urlpatterns = [
    path('create-shop/', create_shop),
    path('dashboard/', dashboard, name='dashboard'),
    path('shops/', list_all_shops),
    path('<slug:slug>/', public_shop_view),
]
