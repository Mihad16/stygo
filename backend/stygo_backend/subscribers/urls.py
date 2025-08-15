from django.urls import path
from .views import WhatsAppSubscribeView

urlpatterns = [
    path('subscribe/', WhatsAppSubscribeView.as_view(), name='whatsapp_subscribe'),
]
