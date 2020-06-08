# pylint: disable=arguments-differ
from rest_framework import serializers
from django.contrib.auth import get_user_model
from sports.serializers import SportSerializer
from user_type.serializers import UserTypeSerializer
# import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from images.serializers import ImageSerializer
from videos.serializers import VideoSerializer
from articles.serializers import ArticleSerializer
from trainings.serializers import PopulatedTrainingSerializer, TrainingSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)
    images = ImageSerializer(many=True, required=False)
    videos = VideoSerializer(many=True, required=False)
    articles = ArticleSerializer(many=True, required=False)
    trainings = PopulatedTrainingSerializer(many=True, required=False)
    student_trainings = PopulatedTrainingSerializer(many=True, required=False)

    def validate(self, data):
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')
        if password != password_confirmation:
            raise ValidationError({'password_confirmation': 'does not match'})
        # try:
        #     validations.validate_password(password=password)
        # except ValidationError as err:
        #     raise serializers.ValidationError({'password': err.messages})
        data['password'] = make_password(password)
        return data

    class Meta:
      model = User 
      fields = '__all__'

class PopulatedUserSerializer(UserSerializer):
  user_type = UserTypeSerializer()
  sports = SportSerializer(many=True)
  