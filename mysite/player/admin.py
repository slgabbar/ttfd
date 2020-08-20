from django.contrib import admin
from player.models import Player


class PlayerAdmin(admin.ModelAdmin):
    pass
    list_display = ('user', 'player_id', 'number',
                    'first_name', 'last_name', 'position', 'age')

admin.site.register(Player, PlayerAdmin)


