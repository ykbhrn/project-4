from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Chat
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = User
    fields = ('id', 'username', 'profile_image')

class ChatSerializer(serializers.ModelSerializer):

  class Meta:
    model = Chat
    fields = '__all__'

class PopulatedChatSerializer(ChatSerializer):
  users = UserSerializer(many=True)
  