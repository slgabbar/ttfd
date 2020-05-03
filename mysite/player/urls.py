from django.urls import path
from django.contrib.auth.decorators import login_required


from . import views

urlpatterns = [
    path('detail/<int:pk>', login_required(views.PlayerDetail.as_view()), name='detail_player'),
    path('add_player/', login_required(views.PlayerCreate.as_view()), name='add_player'),
    path('edit_player/<int:pk>', login_required(views.PlayerUpdate.as_view()), name='edit_player'),
    path('delete_player/<int:pk>', login_required(views.PlayerDelete.as_view()), name='delete_player'),
]