from django.urls import path

from . import views

urlpatterns = [
    path('', views.player, name='player'),
    path('/add/', views.add_player, name='add')
]