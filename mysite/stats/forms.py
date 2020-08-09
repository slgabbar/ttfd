from .models import Stats
from django import forms

class StatsForm(forms.ModelForm):
    class Meta:
        model = Stats
        fields = ('__all__')


