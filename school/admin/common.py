from functools import update_wrapper

from django.contrib.admin import ModelAdmin
from django.contrib.admin.options import csrf_protect_m
from django.core.exceptions import PermissionDenied
from django.template.response import TemplateResponse
from django.urls.base import reverse
from django.utils.html import format_html

from core.decorators import register
from core.admin import ModelAdminToggleViewMixin
from school.models import Subject, Tag
from school.forms import SubjectForm

@register(Subject)
class SubjectAdmin(ModelAdminToggleViewMixin, ModelAdmin):
    list_display = ['display_icon', 'name', 'created_at', 'updated_at', 'display_active', 'display_actions']
    search_fields = ['name']
    list_filter = ['active', 'created_at', 'updated_at']
    form = SubjectForm

    def display_actions(self, obj):
        info = self.model._meta.app_label, self.model._meta.model_name
        return format_html(
            """
            <div class="actions-container">
                <a title="Editar Disciplina" href="%s"><i class="material-icons">edit</i></a>
                <a title="Remover Disciplina" href="%s"><i class="material-icons">delete</i></a>
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

@register(Tag)
class TagAdmin(ModelAdmin):
    list_display = ['name', 'subject', 'parent', 'created_at', 'updated_at', 'display_actions']
    search_fields = ['name']
    list_filter = ['parent', 'created_at', 'updated_at']
    list_per_page = 2

    def display_actions(self, obj):
        info = self.model._meta.app_label, self.model._meta.model_name
        return format_html(
            """
            <div class="actions-container">
                <a title="Editar Marcador" href="%s"><i class="material-icons">edit</i></a>
                <a title="Remover Marcador" href="%s"><i class="material-icons">delete</i></a>
                <a title="Ver Árvore de Marcadores a Partir Daqui" href="%s">Ver Árvore</a>
            </div>
            """ % (
                reverse('admin:%s_%s_change' % info, args=[obj.pk]),
                reverse('admin:%s_%s_delete' % info, args=[obj.pk]),
                reverse('admin:%s_%s_tree_id' % info, args=[obj.pk]),
            )
        )
    display_actions.short_description = 'Ações'

    def get_actions(self, request):
        return []
    
    def get_list_display_links(self, request, list_display):
        return None

    def get_urls(self):
        from django.urls import path

        def wrap(view):
            def wrapper(*args, **kwargs):
                return self.admin_site.admin_view(view)(*args, **kwargs)
            wrapper.model_admin = self
            return update_wrapper(wrapper, view)

        info = self.model._meta.app_label, self.model._meta.model_name

        urls = super().get_urls()
        urls.insert(1, path('tree/', wrap(self.tree_view), name='%s_%s_tree' % info))
        urls.insert(1, path('tree/<int:id>', wrap(self.tree_view_id), name='%s_%s_tree_id' % info))
        return urls
    
    @csrf_protect_m
    def tree_view_id(self, request, id, extra_context=None):
        from django.contrib.admin.views.main import ERROR_FLAG
        opts = self.model._meta
        app_label = opts.app_label
        model_name = opts.model_name
        if not self.has_view_or_change_permission(request):
            raise PermissionDenied

        if extra_context is None:
            extra_context = {
                'root': Tag.objects.filter(pk = id),
            }
        elif 'root' in extra_context:
            extra_context['root'] = Tag.objects.filter(pk = id)

        context = {
            **self.admin_site.each_context(request),
            'app_label': app_label,
            'model_name': model_name,
            'app_config': opts.app_config,
            'title': 'Marcadores em Árvore',
            'verbose_name_plural': opts.verbose_name_plural,
            **(extra_context or {}),
        }

        request.current_app = self.admin_site.name

        return TemplateResponse(request, self.change_list_template or [
            'admin/tag_tree.html'
        ], context)

    @csrf_protect_m
    def tree_view(self, request, extra_context=None):
        from django.contrib.admin.views.main import ERROR_FLAG
        opts = self.model._meta
        app_label = opts.app_label
        model_name = opts.model_name
        if not self.has_view_or_change_permission(request):
            raise PermissionDenied

        if extra_context is None:
            extra_context = {
                'root': Tag.objects.filter(parent = None),
            }
        elif 'root' in extra_context:
            extra_context['root'] = Tag.objects.filter(parent = None)

        context = {
            **self.admin_site.each_context(request),
            'app_label': app_label,
            'model_name': model_name,
            'app_config': opts.app_config,
            'title': 'Marcadores em Árvore',
            'verbose_name_plural': opts.verbose_name_plural,
            **(extra_context or {}),
        }

        request.current_app = self.admin_site.name

        return TemplateResponse(request, self.change_list_template or [
            'admin/tag_tree.html'
        ], context)
