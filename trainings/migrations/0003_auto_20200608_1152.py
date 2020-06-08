# Generated by Django 3.0.7 on 2020-06-08 11:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trainings', '0002_training_ordered'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='training',
            name='ordered',
        ),
        migrations.AddField(
            model_name='training',
            name='bookings',
            field=models.IntegerField(default=0),
        ),
    ]