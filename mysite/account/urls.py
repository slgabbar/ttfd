from django.urls import path

from . import views

urlpatterns = [
    path('register/', views.registration_view, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('login/', views.login_view, name='login'),
    path('edit_team/<int:pk>', views.edit_team, name='edit_team'),
]
