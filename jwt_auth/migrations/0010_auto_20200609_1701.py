# Generated by Django 3.0.7 on 2020-06-09 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0009_auto_20200609_1639'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_image',
            field=models.CharField(default='hey', max_length=300),
        ),
    ]
