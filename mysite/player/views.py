from django.views.generic import DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy

from django.contrib.auth.mixins import LoginRequiredMixin


from .models import Player
from .forms import PlayerForm

class PlayerDetail(LoginRequiredMixin, DetailView):
    model = Player
    template_name = 'player/detail.html'
    context_object_name = 'player'

class PlayerCreate(CreateView):
    template_name = 'player/add_player.html'
    form_class = PlayerForm
    success_url = reverse_lazy('dashboard')
    model = Player

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(PlayerCreate, self).form_valid(form)

class PlayerUpdate(UpdateView):
    model = Player
    template_name = 'player/edit_player.html'
    context_object_name = 'player'
    fields = ('first_name', 'last_name', 'position', 'number',)
    success_url = reverse_lazy('dashboard')

class PlayerDelete(DeleteView):
    model = Player
    template_name = 'player/delete_player.html'
    success_url = reverse_lazy('dashboard')
