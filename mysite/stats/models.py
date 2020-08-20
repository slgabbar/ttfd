from django.db import models

from player.models import Player
from game.models import Game


class Stats(models.Model):
    game_id = models.ForeignKey(Game, on_delete=models.CASCADE)
    player_id = models.ForeignKey(Player, on_delete=models.CASCADE)
    # game_id = models.IntegerField()
    # player_id = models.IntegerField()
    stat = models.CharField(max_length=100)

    def __str__(self):
        return self.stat


