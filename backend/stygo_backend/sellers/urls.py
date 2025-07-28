from django.urls import path
from .views import create_shop, dashboard

urlpatterns = [
    path('create-shop/', create_shop),
     path('dashboard/', dashboard, name='dashboard'),
]
