from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate

from account.models import Account


class RegistrationForm(UserCreationForm):
    username = forms.CharField(label='username', widget=forms.TextInput(
        attrs={
            'class': 'form-control',
            'placeholder': 'Username',
        }
    ))
    email = forms.EmailField(max_length=60, help_text="Required. Add a valid email address.",
                             widget=forms.EmailInput(
                                 attrs={'class':'form-control', 'placeholder': 'Email Address'}
                             ))
    team_name = forms.CharField(label='team_name', widget=forms.TextInput(
        attrs={
            'class': 'form-control',
            'placeholder': 'Team Name',
        }
    ))
    team_location = forms.CharField(label='team_location', widget=forms.TextInput(
        attrs={
            'class': 'form-control',
            'placeholder': 'Team Location',
        }
    ))

    password1 = forms.CharField(label='password1', widget=forms.PasswordInput(
        attrs={
            'class': 'form-control',
            'placeholder': 'Create Password'
        }
    ))
    password2 = forms.CharField(label='password2', widget=forms.PasswordInput(
        attrs={
            'class': 'form-control',
            'placeholder': 'Repeat Password'
        }
    ))

    class Meta:
        model = Account
        fields = ("username", "email", "team_name", "team_location", "password1", "password2")

class AccountAuthenticationForm(forms.ModelForm):
    email = forms.CharField(label='Email', widget=forms.EmailInput(
        attrs={
            'class' : 'form-control',
            'type': 'email',
            'name': 'email',
            'placeholder': 'Email'
        }
    ))
    password = forms.CharField(label='Password', widget=forms.PasswordInput(
        attrs={
            'class': 'form-control',
            'type': 'password',
            'name': 'name',
            'placeholder': 'Password'
        }
    ))

    class Meta:
        model = Account
        fields = ('email', 'password')

    def clean(self):
        if self.is_valid():
            email = self.cleaned_data['email']
            password = self.cleaned_data['password']
            if not authenticate(email=email, password=password):
                raise forms.ValidationError("Invalid login")

class TeamForm(forms.ModelForm):
    class Meta:
        model = Account
        fields = ['team_name', 'team_location']
