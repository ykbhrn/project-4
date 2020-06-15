# pylint: disable=no-member
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth import get_user_model

User = get_user_model()

class Comment(models.Model):
    text = models.CharField(max_length=600)
    owner = models.ForeignKey('jwt_auth.User', related_name='comments', on_delete=models.CASCADE)
    image = models.ForeignKey('images.Image', related_name='comments', on_delete=models.CASCADE, null=True, blank=True)
    video = models.ForeignKey('videos.Video', related_name='comments', on_delete=models.CASCADE, null=True, blank=True)
    article = models.ForeignKey('articles.Article', related_name='comments', on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Commnent {self.id}'