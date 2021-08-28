from django.contrib import admin

from core.decorators import register
from .models import QuestionImage
from .forms import QuestionImageForm

@register(QuestionImage)
class QuestionImageAdmin(admin.ModelAdmin):
    fields = ['title', 'image']
    form = QuestionImageForm
    change_list_template = 'admin/change_list_images.html'
    list_display = ['display_image']
    list_filter = ['created_at', 'updated_at']
    search_fields = ['title']

    def get_actions(self, request):
        return {}
