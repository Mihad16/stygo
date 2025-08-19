from django.contrib import admin
from .models import Suggestion


@admin.register(Suggestion)
class SuggestionAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "email", "language", "created_at")
    list_filter = ("language", "created_at")
    search_fields = ("name", "email", "message")
    readonly_fields = ("created_at",)
