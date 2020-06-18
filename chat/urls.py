from django.urls import path
from .views import ChatListView,ContinueChat

urlpatterns = [
  path('<int:pk>', ChatListView.as_view()),
    path('continue/<int:pk>', ContinueChat.as_view()),
]