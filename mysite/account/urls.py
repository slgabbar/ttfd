from django.urls import path
from django.contrib.auth.decorators import login_required

from . import views

urlpatterns = [
    path('register/', views.registration_view, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('login/', views.login_view, name='login'),
    # path('edit_team/<int:pk>', views.TeamUpdate.as_view(), name='edit_team'),
    path('edit_team/<int:pk>', login_required(views.TeamUpdate.as_view()), name='edit_team'),

]
