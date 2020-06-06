from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Video(models.Model):
  title = models.CharField(max_length=50)
  url = models.CharField(max_length=1000)
  description = models.CharField(max_length=1000)
  owner = models.ForeignKey(
    User,
    related_name='videos',
    on_delete=models.CASCADE
  )

  def __str__(self):
    return f'{self.title}'