from django.urls import path
from .views import VideoListView, VideoDetailView

urlpatterns = [
  path('', VideoListView.as_view()),
  path('<int:pk>', VideoDetailView.as_view()),
]