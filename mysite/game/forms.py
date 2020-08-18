from .models import Game, Player
from bootstrap_modal_forms.forms import BSModalModelForm

class GameForm(BSModalModelForm):
    class Meta:
        model = Game
        exclude = ['user', 'status']
