# Generated by Django 3.0.7 on 2020-06-17 00:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('sports', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Training',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('date', models.CharField(max_length=20)),
                ('time', models.CharField(max_length=20)),
                ('description', models.CharField(max_length=1000)),
                ('bookings', models.IntegerField(default=0)),
                ('limit', models.IntegerField(default=1)),
                ('isFull', models.BooleanField(default=False)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='trainings', to=settings.AUTH_USER_MODEL)),
                ('sports', models.ManyToManyField(related_name='trainings', to='sports.Sport')),
                ('students', models.ManyToManyField(blank=True, related_name='student_trainings', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
