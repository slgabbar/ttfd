from django.db import models

# Create your models here.
class Shot(models.Model):
    game_id = models.IntegerField()
    player_id = models.IntegerField()
    shot_type = models.CharField(max_length=100)
    result = models.CharField(max_length=100)
    value = models.IntegerField()
    zone = models.CharField(max_length=100)
    x_pos = models.DecimalField(decimal_places=2, max_digits=4)
    y_pos = models.DecimalField(decimal_places=2, max_digits=4)

    def __str__(self):
        return self.shot_type + ", " + self.zone + ", " + self.result