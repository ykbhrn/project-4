# Generated by Django 3.0.7 on 2020-06-08 19:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trainings', '0010_auto_20200608_1820'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='training',
            name='students',
        ),
    ]
