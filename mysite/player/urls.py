from django.urls import path

from . import views

urlpatterns = [
    path('', views.player, name='player'),
    path('add/', views.add_player, name='add'),
    path('edit/<int:pk>', views.edit_player, name='edit'),
    path('delete/<int:pk>', views.delete_player, name='delete')
]