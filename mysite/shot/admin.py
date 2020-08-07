from django.contrib import admin
from shot.models import Shot

class ShotAdmin(admin.ModelAdmin):
    list_display = ('shot_type', )


admin.site.register(Shot, ShotAdmin)
