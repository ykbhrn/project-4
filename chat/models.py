from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Chat(models.Model):
  users = models.ManyToManyField(User, related_name='chats')
  text = models.CharField(max_length=600)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return f'Comment{self.id}'
    