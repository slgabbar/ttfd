from django.contrib import admin
from django.contrib import admin
from stats.models import Stats

class StatsAdmin(admin.ModelAdmin):
    list_display = ('pk', 'game_id', 'player_id', 'stat')

admin.site.register(Stats, StatsAdmin)
