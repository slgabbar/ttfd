from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate, logout
from .forms import RegistrationForm, AccountAuthenticationForm, TeamForm
from django.views.generic.edit import UpdateView
from django.urls import reverse_lazy

from bootstrap_modal_forms.generic import BSModalUpdateView

from django.core.exceptions import PermissionDenied


from .models import Account

def registration_view(request):
    context = {}
    if request.POST:
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            email = form.cleaned_data.get("email")
            raw_password = form.cleaned_data.get("password1")
            account = authenticate(email=email, password=raw_password)
            login(request, account)
            return redirect("dashboard")
        else:
            context['registration_form'] = form
    else:
        form = RegistrationForm()
        context['registration_form'] = form
    return render(request, 'account/register.html', context)

def logout_view(request):
    logout(request)
    return redirect("home")


def login_view(request):
    context = {}

    user = request.user
    if user.is_authenticated:
        return redirect("dashboard")

    if request.POST:
        form = AccountAuthenticationForm(request.POST)
        if form.is_valid():
            email = request.POST['email']
            password = request.POST['password']
            user = authenticate(email=email, password=password)
            if user:
                login(request, user)
                return redirect("dashboard")
    else:
        form = AccountAuthenticationForm()

    context['login_form'] = form
    return render(request, 'account/login.html', context)

class TeamUpdate(BSModalUpdateView):
    model = Account
    template_name = 'account/edit_team.html'
    context_object_name = 'account'
    # form_class = TeamForm
    fields = ('team_name', 'team_location',)
    success_url = reverse_lazy('dashboard')

    def get_object(self, queryset=None):
        obj = super().get_object()
        print(obj.username)
        print(self.request.user.username)
        if obj.username != self.request.user.username:
            raise PermissionDenied
        return obj










