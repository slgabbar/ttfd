from django import forms
from .models import Player
from bootstrap_modal_forms.forms import BSModalForm

class PlayerForm(BSModalForm):
    class Meta:
        model = Player
        # fields = ['user', 'first_name', 'last_name']
        exclude = ['user']

# class PlayerForm(forms.ModelForm):
#     class Meta:
#         model = Player
#         # fields = ['user', 'first_name', 'last_name']
#         exclude = ['user']
