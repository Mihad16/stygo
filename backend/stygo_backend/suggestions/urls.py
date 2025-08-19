from django.urls import path
from .views import SuggestionListCreateView

urlpatterns = [
    path("", SuggestionListCreateView.as_view(), name="suggestion-list-create"),
]
