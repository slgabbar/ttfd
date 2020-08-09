from django.urls import path
from . import views

urlpatterns = [
    path('post/ajax/shot', views.postShot, name='post_shot'),
    path('delete/<int:pk>', views.deleteShot, name='delete_shot'),
]