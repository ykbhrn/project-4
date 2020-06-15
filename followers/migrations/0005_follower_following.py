# Generated by Django 3.0.7 on 2020-06-14 01:59

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('followers', '0004_auto_20200614_0151'),
    ]

    operations = [
        migrations.AddField(
            model_name='follower',
            name='following',
            field=models.ManyToManyField(blank=True, related_name='following', to=settings.AUTH_USER_MODEL),
        ),
    ]
