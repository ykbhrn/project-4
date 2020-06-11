from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Article(models.Model):
  title = models.CharField(max_length=100)
  imageUrl = models.CharField(max_length=1000)
  text = models.CharField(max_length=100000)
  titleImageUrl = models.CharField(max_length=1000, blank=True)
  owner = models.ForeignKey(
    User,
    related_name='articles',
    on_delete=models.CASCADE
  )

  def __str__(self):
    return f'{self.title}'