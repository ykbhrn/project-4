from django.db import models

class UserType(models.Model):
  name = models.CharField(max_length=50)

  def __str__(self):
    return f'{self.name}'
