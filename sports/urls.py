from django.urls import path
from .views import SportListView

urlpatterns = [
  path('', SportListView.as_view()),
]