from django.shortcuts import render

from player.models import Player

# Create your views here.

def home_view(request):
    return render(request, "layout/home.html", {})

def dash_view(request):
    players = Player.objects.order_by('last_name')
    context = {
        'player_list': players,
    }
    return render(request, 'layout/dashboard.html', context)
