from django.db import models
from django.contrib.auth import get_user_model as user_model
from django.core.validators import MaxValueValidator, MinValueValidator
User = user_model()

# Create your models here.

class Player(models.Model):

    POSITION_CHOICE = [
        ('guard', 'Guard'),
        ('forward', 'Forward'),
        ('center', 'Center'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='player', null=True)
    player_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    position = models.CharField(
        max_length=7,
        choices=POSITION_CHOICE,
    )
    number = models.IntegerField(validators=[MaxValueValidator(99), MinValueValidator(0)])

    def __str__(self):
        return self.first_name + " " + self.last_name


