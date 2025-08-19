from django.db import models


class Suggestion(models.Model):
    name = models.CharField(max_length=120, blank=True)
    email = models.EmailField(blank=True)
    language = models.CharField(max_length=20, blank=True)
    message = models.TextField()
    page_path = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        prefix = self.name or "Anonymous"
        return f"{prefix} @ {self.created_at:%Y-%m-%d %H:%M}"
