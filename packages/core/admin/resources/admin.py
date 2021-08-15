from django.contrib import admin

from core.decorators import register
from .models import QuestionImage
from .forms import QuestionImageForm

@register(QuestionImage)
class QuestionImageAdmin(admin.ModelAdmin):
    fields = ['title', 'image']
    form = QuestionImageForm

    def get_actions(self, request):
        return {}
