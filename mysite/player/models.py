from django.db import models
from django.contrib.auth import get_user_model as user_model
from django.core.validators import MaxValueValidator, MinValueValidator
User = user_model()

# Create your models here.

class Player(models.Model):

    POSITION_CHOICE = [
        ('Guard', 'Guard'),
        ('Forward', 'Forward'),
        ('Center', 'Center'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='player', null=True)
    player_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    position = models.CharField(
        max_length=7,
        choices=POSITION_CHOICE,
    )
    height_feet = models.IntegerField(choices=list(zip(range(4, 8), range(4, 8))))
    height_inches = models.IntegerField(choices=list(zip(range(0, 12), range(0, 12))))
    weight = models.IntegerField()

    age = models.IntegerField(validators=[MaxValueValidator(99), MinValueValidator(0)])

    number = models.IntegerField(validators=[MaxValueValidator(99), MinValueValidator(0)])

    def __str__(self):
        return self.first_name + " " + self.last_name

    def height(self):
        return str(self.height_feet) + '\'' + str(self.height_inches)

    def player_abrev(self):
        return self.first_name[0] + ". " + self.last_name

    def pos_abrev(self):
        return self.position[0];

