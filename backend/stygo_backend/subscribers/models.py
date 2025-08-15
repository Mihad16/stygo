from django.db import models

class WhatsAppSubscriber(models.Model):
    phone_number = models.CharField(max_length=20, unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, blank=True, null=True)


   