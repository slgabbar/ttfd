from crispy_forms.bootstrap import PrependedText
from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, HTML, Div

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate

from account.models import Account


class RegistrationForm(UserCreationForm):
    username = forms.CharField(label='', widget=forms.TextInput(
            attrs={'placeholder': 'Username',}))
    email = forms.EmailField(label='', max_length=60, widget=forms.EmailInput(
            attrs={'placeholder': 'Email Address'}))
    team_name = forms.CharField(label='', widget=forms.TextInput(
            attrs={'placeholder': 'Team Name',}))
    team_location = forms.CharField(label='', widget=forms.TextInput(
            attrs={'placeholder': 'Team Location',}))
    password1 = forms.CharField(label='', widget=forms.PasswordInput(
            attrs={'placeholder': 'Create Password'}))
    password2 = forms.CharField(label='', widget=forms.PasswordInput(
            attrs={'placeholder': 'Repeat Password'}))

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            PrependedText('username', '<i class="fa fa-user fa-fw"></i>'),
            PrependedText('email', '<i class="fa fa-envelope fa-fw"></i>'),
            PrependedText('team_name', '<i class="fa fa-info fa-fw"></i>'),
            PrependedText('team_location', '<i class="fa fa-location-arrow fa-fw"></i>'),
            PrependedText('password1', '<i class="fa fa-lock fa-fw"></i>'),
            PrependedText('password2', '<i class="fa fa-lock fa-fw"></i>'),
            Div(Submit('submit', 'Register', css_class="btn btn-primary btn-block"),css_class='form-group')
        )

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
