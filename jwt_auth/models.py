from django.db import models
from django.contrib.auth.models import AbstractUser
from user_type.models import UserType

class User(AbstractUser):
  email = models.CharField(max_length=50, unique=True)
  profile_image = models.CharField(max_length=300)
  bio = models.CharField(max_length=300, blank=True)
  sports = models.ManyToManyField(
    'sports.Sport',
    related_name='users'
  )
  user_type = models.ForeignKey(
    UserType,
    related_name='users',
    on_delete=models.CASCADE,
    default=1
  )
  # followers = models.ManyToManyField('self', related_name='following', blank=True)
  # following = models.ManyToManyField('self', related_name='followers', blank=True)
 