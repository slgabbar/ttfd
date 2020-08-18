# Generated by Django 3.0.2 on 2020-08-13 22:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='status',
            field=models.CharField(choices=[('In Progress', 'In Progress'), ('Done', 'Done')], default=2, max_length=11),
            preserve_default=False,
        ),
    ]
