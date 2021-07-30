from django.contrib import admin
from django.urls.base import reverse
from django.utils.html import format_html

from core.decorators import register
from core.filters import custom_titled_filter
from core.admin import ModelAdminToggleViewMixin
from school.models import Question, QuestionTag, QuestionAlternative, QuestionResolution
from school.forms import QuestionAlternativeForm, QuestionResolutionForm, QuestionForm
from school.filters import ExamFilter, TagFilter, TeacherFilter, QuestionFilter

class QuestionAlternativeInlineAdmin(admin.StackedInline):
    model = QuestionAlternative
    form = QuestionAlternativeForm
    fields = ['text', 'correct']
    extra = 0

class QuestionTagInlineAdmin(admin.TabularInline):
    model = QuestionTag
    extra = 0

@register(Question)
class QuestionAdmin(ModelAdminToggleViewMixin, admin.ModelAdmin):
    list_display = ['short_description', 'level', 'subject', 'display_active', 'display_actions']
    list_filter = (
        'active',
        'level',
        ExamFilter,
        ('subject__name', custom_titled_filter('Disciplina')),
        TagFilter,
        'created_at',
        'updated_at',
    )
    search_fields = ['text']
    fieldsets = (
        (None, {
            'fields': ('short_description', 'exam', 'active', 'text')
        }),
        ('Informações', {
            'fields': ('level', 'subject')
        })
    )
    form = QuestionForm
    inlines = [
        QuestionTagInlineAdmin,
        QuestionAlternativeInlineAdmin,
    ]

    def get_actions(self, request):
        return []

    def get_list_display_links(self, request, list_display):
        return None

    def display_actions(self, obj):
        info = self.model._meta.app_label, self.model._meta.model_name
        return format_html(
            """
            <div class="actions-container">
                <a title="Editar Questão" href="%s"><i class="material-icons">edit</i></a>
                <a title="Remover Questão" href="%s"><i class="material-icons">delete</i></a>
                <a title="Ver Resoluções para Essa Questão" href="%s?question=%s">Resoluções</a>
            </a>
            """ % (
                reverse('admin:%s_%s_change' % info, args=[obj.pk]),
                reverse('admin:%s_%s_delete' % info, args=[obj.pk]),
                reverse('admin:%s_%s_changelist' % (self.model._meta.app_label, 'questionresolution')),
                obj.pk
            )
        )
    display_actions.short_description = 'Ações'

@register(QuestionResolution)
class QuestionResolutionAdmin(ModelAdminToggleViewMixin, admin.ModelAdmin):
    form = QuestionResolutionForm
    fields = ['active', 'question', 'teacher', 'resolution_type', 'text', 'video_url', 'cover_image']
    list_display = ['display_cover', 'question', 'teacher', 'resolution_type', 'display_active', 'display_actions']
    search_fields = ['text']
    list_filter = [
        'active',
        'resolution_type',
        TeacherFilter,
        QuestionFilter,
        'created_at',
        'updated_at',
    ]

    def display_cover(self, obj):
        return format_html('<img src="%s" style="max-width: 200px;" />' % obj.cover_image.url)
    display_cover.short_description = 'Imagem de Capa'

    def display_actions(self, obj):
        info = self.model._meta.app_label, self.model._meta.model_name
        return format_html(
            """
            <div class="actions-container">
                <a title="Editar Resolução" href="%s"><i class="material-icons">edit</i></a>
                <a title="Remover Resolução" href="%s"><i class="material-icons">delete</i></a>
            </div>
            """ % (
                reverse('admin:%s_%s_change' % info, args=[obj.pk]),
                reverse('admin:%s_%s_delete' % info, args=[obj.pk])
            )
        )
    display_actions.short_description = 'Ações'

    def get_actions(self, request):
        return []

    def get_list_display_links(self, request, list_display):
        return None
