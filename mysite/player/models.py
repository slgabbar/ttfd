from django.db import models
# from django.contrib.auth import get_user_model as user_model
# User = user_model()

# Create your models here.

class Player(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    # number = models.IntegerField()

    def __str__(self):
        return self.first_name + " " + self.last_name


