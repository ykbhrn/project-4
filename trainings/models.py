from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Training(models.Model):
  title = models.CharField(max_length=50)
  imageUrl = models.CharField(max_length=1000)
  description = models.CharField(max_length=1000)
  owner = models.ForeignKey(
    User,
    related_name='images',
    on_delete=models.CASCADE
  )

  def __str__(self):
    return f'{self.title}'