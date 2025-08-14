from django.db import models

class WhatsAppSubscriber(models.Model):
    phone_number = models.CharField(max_length=20, unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    consent = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.phone_number} ({'active' if self.is_active else 'inactive'})"