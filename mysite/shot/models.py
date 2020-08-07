from django.db import models

# Create your models here.
class Shot(models.Model):
    shot_type = models.CharField(max_length=100)

    def __str__(self):
        return self.shot_type