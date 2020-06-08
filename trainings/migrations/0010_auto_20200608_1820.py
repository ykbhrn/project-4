# Generated by Django 3.0.7 on 2020-06-08 18:20

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('trainings', '0009_auto_20200608_1817'),
    ]

    operations = [
        migrations.AlterField(
            model_name='training',
            name='students',
            field=models.ManyToManyField(blank=True, related_name='student_trainings', to=settings.AUTH_USER_MODEL),
        ),
    ]
