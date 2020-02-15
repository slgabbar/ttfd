from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from .models import Player
from .forms import CreatePlayer

def player(request):
    return render(request, 'player/player.html', {})

def add_player(request):
    if request.method == 'POST':
        form = CreatePlayer(request.POST, request.user)

        if form.is_valid():
            instance = form.save(commit=False)
            instance.user = request.user
            instance.save()
            return redirect('dashboard')
    else:
        form = CreatePlayer()
    return render(request, 'player/add_player.html', {'form':form})


