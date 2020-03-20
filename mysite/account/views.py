from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate, logout
from .forms import RegistrationForm, AccountAuthenticationForm, TeamForm
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

def edit_team(request, pk):
    team = get_object_or_404(Account, pk=pk)
    form = TeamForm(request.POST or None, instance=team)
    if form.is_valid():
        form.save()
        return redirect('dashboard')
    return render(request, 'account/edit_team.html', {'form':form})











