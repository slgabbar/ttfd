from django import forms
from .models import Player
from bootstrap_modal_forms.forms import BSModalModelForm

class PlayerForm(BSModalModelForm):
    class Meta:
        model = Player
        # fields = ['user', 'first_name', 'last_name']
        exclude = ['user']

# class PlayerForm(forms.ModelForm):
#     class Meta:
#         model = Player
#         # fields = ['user', 'first_name', 'last_name']
#         exclude = ['user']
