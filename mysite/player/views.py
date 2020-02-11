from django.shortcuts import render
from .models import Player


def dashboard(request):
    players = Player.objects.order_by('last_name')
    context = {
        'player_list': players,
    }
    return render(request, 'player/dashboard.html', context)
