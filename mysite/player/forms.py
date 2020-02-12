from django import forms
from .models import Player

class CreatePlayer(forms.ModelForm):
    class Meta:
        model = Player
        fields = ['first_name', 'last_name']
