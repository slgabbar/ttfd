from django.urls import path

from . import views

urlpatterns = [
    path('detail/<int:pk>', views.PlayerDetail.as_view(), name='detail_player'),
    path('add_player/', views.PlayerCreate.as_view(), name='add_player'),
    path('edit_player/<int:pk>', views.PlayerUpdate.as_view(), name='edit_player'),
    path('delete_player/<int:pk>', views.PlayerDelete.as_view(), name='delete_player'),
]