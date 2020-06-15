# Generated by Django 3.0.7 on 2020-06-14 17:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0002_image_owner'),
        ('articles', '0002_article_owner'),
        ('comments', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='article',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='articles.Article'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='comment',
            name='image',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='images.Image'),
        ),
    ]
