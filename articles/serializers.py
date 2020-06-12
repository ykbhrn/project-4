from rest_framework import serializers 
from django.contrib.auth import get_user_model

from .models import Article
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = User
    fields = ('id', 'username', 'profile_image')

class ArticleSerializer(serializers.ModelSerializer):

  class Meta:
    model = Article
    fields = '__all__'

class PopulatedArticleSerializer(ArticleSerializer):
  owner = UserSerializer()