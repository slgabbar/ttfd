from django.shortcuts import render, redirect, get_object_or_404

from game.models import Game


# Create your views here.

def home_view(request):
    return render(request, "layout/home.html", {})

def dash_view(request):
    if request.user.is_authenticated:
        # If user logged in, render dashboard view
        return render(request, 'layout/dashboard.html', {})
    else:
        # If user not logged in, redirect to home
        return redirect('home')

# def game_view(request, game_id):
#     game = get_object_or_404(Game, pk=game_id)
#     return render(request, 'layout/game.html', {'game': game})
