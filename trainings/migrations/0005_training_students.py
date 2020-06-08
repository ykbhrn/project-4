# Generated by Django 3.0.7 on 2020-06-08 16:59

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('trainings', '0004_auto_20200608_1200'),
    ]

    operations = [
        migrations.AddField(
            model_name='training',
            name='students',
            field=models.ManyToManyField(related_name='student_trainings', to=settings.AUTH_USER_MODEL),
        ),
    ]
