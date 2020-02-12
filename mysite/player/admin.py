from django.contrib import admin
from player.models import Player


class PlayerAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name')

admin.site.register(Player, PlayerAdmin)


