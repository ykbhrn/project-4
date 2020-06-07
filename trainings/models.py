from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Training(models.Model):
  name = models.CharField(max_length=50)
  date = models.CharField(max_length=20)
  time = models.CharField(max_length=20)
  description = models.CharField(max_length=1000)
  owner = models.ForeignKey(
    User,
    related_name='trainings',
    on_delete=models.CASCADE
  )
  sports = models.ManyToManyField(
    'sports.Sport',
    related_name='trainings'
  )

  def __str__(self):
    return f'{self.title}'