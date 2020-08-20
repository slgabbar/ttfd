from django.db import models
from django.contrib.auth import get_user_model as user_model
from django.contrib.postgres.fields import ArrayField
from player.models import Player

User = user_model()

# Custom game manager, add in_progress which will filter data to only
# games still currently in progress.
class GameManager(models.Manager):
    def in_progress(self):
        # return super(GameManager, self).get_queryset().filter(status='In Progress')
        return self.get_queryset().filter(status='In Progress')

class Game(models.Model):

    HOME_AWAY = [
        ('Home', 'Home'),
        ('Away', 'Away'),
    ]

    GAME_STATUS = [
        ('In Progress', 'In Progress'),
        ('Done', 'Done'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='game', null=True)
    game_id = models.AutoField(primary_key=True)
    date = models.DateField()
    location = models.CharField(max_length=100)
    opponent = models.CharField(max_length=100)

    home_away = models.CharField(
        max_length=10,
        choices=HOME_AWAY,
    )

    status = models.CharField(
        max_length=15,
        choices=GAME_STATUS,
    )

    objects = GameManager()

    def __str__(self):
        game_str = self.home_away + " vs. " + self.opponent
        return game_str
