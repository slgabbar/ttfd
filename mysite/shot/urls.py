from django.urls import path
from . import views

urlpatterns = [
    path('post/ajax/shot', views.postShot, name='post_shot'),
]