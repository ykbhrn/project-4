from rest_framework import serializers 
from django.contrib.auth import get_user_model
from sports.serializers import SportSerializer

from .models import Training
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = User
    fields = ('id', 'username')


class TrainingSerializer(serializers.ModelSerializer):

  class Meta:
    model = Training
    fields = '__all__'

class PopulatedTrainingSerializer(TrainingSerializer):
  owner = UserSerializer()
  sports = SportSerializer(many=True)