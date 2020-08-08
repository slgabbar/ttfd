from django.contrib import admin
from shot.models import Shot

class ShotAdmin(admin.ModelAdmin):
    list_display = ('pk', 'game_id', 'player_id', 'shot_type',
                    'result','zone', 'x_pos', 'y_pos')

admin.site.register(Shot, ShotAdmin)
