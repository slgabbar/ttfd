from django.contrib import admin
from game.models import Game


class GameAdmin(admin.ModelAdmin):
    list_display = ('user', 'game_id', 'date',
                    'location', 'opponent', 'home_away', 'status')

admin.site.register(Game, GameAdmin)

