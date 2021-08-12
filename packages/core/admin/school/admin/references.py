from django.contrib.admin import ModelAdmin
from django.urls.base import reverse
from django.utils.html import format_html

from core.decorators import register
from core.admin import ModelAdminToggleViewMixin
from school.models import Institution, Exam
from school.filters import InstitutionFilter

@register(Institution)
class InstitutionAdmin(ModelAdminToggleViewMixin, ModelAdmin):
    list_display = ['name', 'created_at', 'updated_at', 'display_active', 'display_actions']
    search_fields = ['name']
    list_filter = ['active', 'created_at', 'updated_at']

    def display_actions(self, obj):
        info = self.model._meta.app_label, self.model._meta.model_name
        return format_html(
            """
            <div class="actions-container">
                <a title="Editar Instituição" href="%s"><i class="material-icons">edit</i></a>
                <a title="Remover Instituição" href="%s"><i class="material-icons">delete</i></a>
                <a title="Ver Provas para Essa Instituição" href="%s?institution=%s">Provas</a>
            </div>
            """ % (
                reverse('admin:%s_%s_change' % info, args=[obj.pk]),
                reverse('admin:%s_%s_delete' % info, args=[obj.pk]),
                reverse('admin:%s_%s_changelist' % (self.model._meta.app_label, 'exam')),
                obj.pk
            )
        )
    display_actions.short_description = 'Ações'

    def get_actions(self, request):
        return []
    
    def get_list_display_links(self, request, list_display):
        return None

@register(Exam)
class ExamAdmin(ModelAdminToggleViewMixin, ModelAdmin):
    list_display = ['name', 'institution', 'year', 'uf', 'created_at', 'updated_at', 'display_active', 'display_actions']
    search_fields = ['name']
    list_filter = (
        'year',
        'uf',
        'active',
        InstitutionFilter,
        'created_at',
        'updated_at',
    )

    def display_actions(self, obj):
        info = self.model._meta.app_label, self.model._meta.model_name
        return format_html(
            """
            <div class="actions-container">
                <a title="Editar Prova" href="%s"><i class="material-icons">edit</i></a>
                <a title="Remover Prova" href="%s"><i class="material-icons">delete</i></a>
                <a title="Ver Questões para Essa Prova" href="%s?exam=%s">Questões</a>
            </div>
            """ % (
                reverse('admin:%s_%s_change' % info, args=[obj.pk]),
                reverse('admin:%s_%s_delete' % info, args=[obj.pk]),
                reverse('admin:%s_%s_changelist' % (self.model._meta.app_label, 'question')),
                obj.pk
            )
        )
    display_actions.short_description = 'Ações'

    def get_actions(self, request):
        return []
    
    def get_list_display_links(self, request, list_display):
        return None
