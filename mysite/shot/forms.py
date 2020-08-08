from .models import Shot
from django import forms

class ShotForm(forms.ModelForm):
    class Meta:
        model = Shot
        fields = ('__all__')


