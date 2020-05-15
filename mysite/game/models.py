from django.db import models
from django.contrib.auth import get_user_model as user_model

User = user_model()

class Game(models.Model):

    HOME_AWAY = [
        ('Home', 'Home'),
        ('Away', 'Away'),
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

    def __str__(self):
        game_str = self.home_away + " vs. " + self.opponent
        return game_str