from django.urls import path
from .views import UserTypeListView

urlpatterns = [
  path('', UserTypeListView.as_view()),
]