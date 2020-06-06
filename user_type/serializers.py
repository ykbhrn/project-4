from rest_framework import serializers
from django.apps import apps
from django.contrib.auth import get_user_model
from .models import UserType

User = apps.get_model('jwt_auth', 'User')

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'id')

class UserTypeSerializer(serializers.ModelSerializer):

  class Meta:
    model = UserType
    fields = '__all__'

class PopulatedUserTypeSerializer(UserTypeSerializer):
  users = UserSerializer(many=True)