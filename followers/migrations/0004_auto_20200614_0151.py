# Generated by Django 3.0.7 on 2020-06-14 01:51

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('followers', '0003_follower_following'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='follower',
            name='followers',
        ),
        migrations.RemoveField(
            model_name='follower',
            name='following',
        ),
        migrations.AddField(
            model_name='follower',
            name='followers_list',
            field=models.ManyToManyField(blank=True, related_name='followers_list', to=settings.AUTH_USER_MODEL),
        ),
    ]