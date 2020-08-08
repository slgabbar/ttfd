from django.urls import path
from . import views

urlpatterns = [
    path('post/ajax/stats', views.postStats, name='post_stats'),
    path('delete/<int:pk>', views.deleteStats, name='delete_stats'),
]