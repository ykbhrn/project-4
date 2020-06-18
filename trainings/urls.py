from django.urls import path
from .views import TrainingListView, TrainingDetailView

urlpatterns = [
  path('', TrainingListView.as_view()),
  path('<int:pk>', TrainingDetailView.as_view()),
]