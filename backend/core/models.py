from django.db import models
from django.urls.base import reverse
from django.utils.html import format_html

class TimestampsMixin(models.Model):
    created_at = models.DateTimeField(
        verbose_name = 'Criado em',
        auto_now_add = True,
    )
    updated_at = models.DateTimeField(
        verbose_name = 'Atualizado em',
        auto_now  = True,
    )

    class Meta:
        abstract = True

class ActiveMixin(models.Model):
    active = models.BooleanField(
        verbose_name = 'Ativo',
        default = True,
        help_text = 'Indique se esse item está ativo.',
    )

    def display_active(self):
        html = ''
        if self.active:
            html = '<i class="material-icons">check_box</i>'
        else:
            html = '<i class="material-icons">check_box_outline_blank</i>'
        info = self._meta.app_label, self._meta.model_name
        link = reverse('admin:%s_%s_toggle_active' % info, args=[self.pk])
        return format_html("""
            <a href="%s" class="fake-checkbox">%s</a>
        """ % (link, html))
    display_active.short_description = 'Ativo'

    class Meta:
        abstract = True

class ActiveTimestampsMixin(ActiveMixin, TimestampsMixin, models.Model):
    class Meta:
        abstract = True
