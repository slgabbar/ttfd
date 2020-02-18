from django.shortcuts import render, redirect

from player.models import Player

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
