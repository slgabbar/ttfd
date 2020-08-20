from django.urls import path
from django.contrib.auth.decorators import login_required


from . import views

urlpatterns = [
    path('create_game/', login_required(views.CreateGame.as_view()), name='create_game'),
    path('scout_game/<int:pk>', login_required(views.ScoutGame.as_view()), name='scout_game'),
    path('end_game/<int:pk>', views.end_game, name='end_game'),
]