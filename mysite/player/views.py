from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponseRedirect
from .models import Player
from .forms import PlayerForm

def player(request):
    if request.user.is_authenticated:
        return render(request, 'player/player.html', {})
    else:
        return redirect('home')

def add_player(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            form = PlayerForm(request.POST, request.user)

            if form.is_valid():
                instance = form.save(commit=False)
                instance.user = request.user
                instance.save()
                return redirect('dashboard')
        else:
            form = PlayerForm()
        return render(request, 'player/add_player.html', {'form':form})
    else:
        return redirect('home')

def edit_player(request, pk):
    player = get_object_or_404(Player, pk=pk)
    form = PlayerForm(request.POST or None, instance=player)
    if form.is_valid():
        form.save()
        return redirect('dashboard')
    return render(request, 'player/edit_player.html', {'form':form})

def delete_player(request, pk):
    player = get_object_or_404(Player, pk=pk)
    if request.method=='POST':
        player.delete()
        return redirect('dashboard')
    return render(request, 'player/delete_player.html', {'object':player})
