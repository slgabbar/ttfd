from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.generic.detail import DetailView
from django.views.generic import ListView
# from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy, reverse
from django.core.exceptions import PermissionDenied

from bootstrap_modal_forms.generic import (BSModalCreateView,
                                           BSModalUpdateView,
                                           BSModalReadView,
                                           BSModalDeleteView)

from django.contrib.auth.mixins import LoginRequiredMixin


from .models import Game
from .forms import GameForm

class ScoutGame(DetailView):
    model = Game
    template_name = 'game/scout_game.html'
    context_object_name = 'game'

    def get_object(self, queryset=None):
        obj = super().get_object()
        if obj.user != self.request.user:
            raise PermissionDenied
        return obj

class CreateGame(LoginRequiredMixin, BSModalCreateView):
    template_name = 'game/new_game.html'
    form_class = GameForm
    model = Game

    def form_valid(self, form):
        form.instance.user = self.request.user
        form.instance.status = 'In Progress'
        return super(CreateGame, self).form_valid(form)

    def get_success_url(self):
        if self.object.pk is None:
            return reverse_lazy('create_game')
        else:
            return reverse_lazy('scout_game', kwargs={'pk':self.object.pk})

def end_game(request, pk):
    game = get_object_or_404(Game, pk=pk)
    if request.method == 'POST':
        game.status = 'Done'
        game.save()
    return JsonResponse({"status": "ok"}, status=204)

