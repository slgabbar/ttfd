from django.db import models

class Stats(models.Model):
    game_id = models.IntegerField()
    player_id = models.IntegerField()
    stat = models.CharField(max_length=100)

    def __str__(self):
        return self.stat


