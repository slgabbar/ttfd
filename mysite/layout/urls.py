from django.urls import path

from . import views

urlpatterns = [
    path('', views.home_view, name="home"),
    path('dashboard/', views.dash_view, name='dashboard'),
    path('shotchart/', views.shotchart_view, name='shotchart')
]
