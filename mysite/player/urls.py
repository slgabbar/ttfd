from django.urls import path

from . import views

urlpatterns = [
    path('add_player/', views.add_player, name='add_player'),
    path('edit_player/<int:pk>', views.edit_player, name='edit_player'),
    path('delete_player/<int:pk>', views.delete_player, name='delete_player')
]