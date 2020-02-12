from django.db import models
from django.contrib.auth import get_user_model as user_model
User = user_model()

# Create your models here.

class Player(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='player', null=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    def __str__(self):
        return self.first_name + " " + self.last_name


