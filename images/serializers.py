from rest_framework import serializers 
from django.contrib.auth import get_user_model

from .models import Image
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = User
    fields = ('id', 'username')

class ImageSerializer(serializers.ModelSerializer):

  class Meta:
    model = Image
    fields = '__all__'

class PopulatedImageSerializer(ImageSerializer):
  owner = UserSerializer()