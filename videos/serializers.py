from rest_framework import serializers 
from django.contrib.auth import get_user_model
from comments.serializers import PopulatedCommentSerializer


from .models import Video
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = User
    fields = ('id', 'username', 'profile_image')

class VideoSerializer(serializers.ModelSerializer):

  class Meta:
    model = Video
    fields = '__all__'

class PopulatedVideoSerializer(VideoSerializer):
  owner = UserSerializer()
  comments = PopulatedCommentSerializer(many=True)
