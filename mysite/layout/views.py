from django.shortcuts import render

# Create your views here.

def home_view(request):
    return render(request, "layout/home.html", {})

def dash_view(request):
    return render(request, 'layout/dashboard.html', {})

