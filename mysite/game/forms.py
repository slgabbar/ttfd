from .models import Game
from bootstrap_modal_forms.forms import BSModalForm

class GameForm(BSModalForm):
    class Meta:
        model = Game
        exclude = ['user']