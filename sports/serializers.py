from rest_framework import serializers
from django.apps import apps
from django.contrib.auth import get_user_model
from .models import Sport

User = apps.get_model('jwt_auth', 'User')

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'id')

class SportSerializer(serializers.ModelSerializer):

    class Meta:
      model = Sport
      fields = '__all__'

class PopulatedSportSerializer(SportSerializer):
    users = UserSerializer(many=True)