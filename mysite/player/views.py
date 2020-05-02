from django.views.generic import DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.core.exceptions import PermissionDenied

from bootstrap_modal_forms.generic import (BSModalCreateView,
                                           BSModalUpdateView,
                                           BSModalReadView,
                                           BSModalDeleteView)

from django.contrib.auth.mixins import LoginRequiredMixin


from .models import Player
from .forms import PlayerForm

class PlayerDetail(LoginRequiredMixin, BSModalReadView):
    model = Player
    template_name = 'player/detail.html'
    context_object_name = 'player'

    def get_object(self, queryset=None):
        obj = super().get_object()
        if obj.user != self.request.user:
            raise PermissionDenied
        return obj

class PlayerCreate(BSModalCreateView):
    template_name = 'player/add_player.html'
    form_class = PlayerForm
    success_url = reverse_lazy('dashboard')
    model = Player

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(PlayerCreate, self).form_valid(form)

class PlayerUpdate(BSModalUpdateView):
    model = Player
    template_name = 'player/edit_player.html'
    context_object_name = 'player'
    form_class = PlayerForm
    # fields = ('first_name', 'last_name', 'position', 'number',)
    success_url = reverse_lazy('dashboard')

    def get_object(self, queryset=None):
        obj = super().get_object()
        if obj.user != self.request.user:
            raise PermissionDenied
        return obj

class PlayerDelete(BSModalDeleteView):
    model = Player
    template_name = 'player/delete_player.html'
    success_url = reverse_lazy('dashboard')
    success_message = "Player successfully deleted."

    def get_object(self, queryset=None):
        obj = super().get_object()
        if obj.user != self.request.user:
            raise PermissionDenied
        return obj
