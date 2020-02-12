# Generated by Django 3.0.2 on 2020-02-12 22:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('player', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='player', to=settings.AUTH_USER_MODEL),
        ),
    ]
