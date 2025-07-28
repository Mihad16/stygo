from django.urls import path
from .views import create_shop, dashboard, list_all_shops

urlpatterns = [
    path('create-shop/', create_shop),
     path('dashboard/', dashboard, name='dashboard'),
       path('shops/', list_all_shops),
]
