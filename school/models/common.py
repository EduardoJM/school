from django.db import models
from django.utils.html import format_html

from core.models import ActiveTimestampsMixin, TimestampsMixin

class Subject(ActiveTimestampsMixin, models.Model):
    name = models.CharField(
        verbose_name = 'Nome',
        max_length = 100,
        unique = True,
        help_text = 'Adicione um nome para a disciplina.'
    )
    icon = models.ImageField(
        verbose_name = 'Ícone',
        upload_to = 'images/icons/subjects',
        help_text = 'Adicione um ícone para a disciplina.'
    )

    def display_icon(self):
        return format_html('<img class="icon subject-icon" style="max-width: 80px; height: auto;" src="%s" alt="%s" />' % (self.icon.url, self.name))
    display_icon.short_description = 'Ícone'

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Disciplina'
        verbose_name_plural = 'Disciplinas'

class Tag(TimestampsMixin, models.Model):
    name = models.CharField(
        verbose_name = 'Nome',
        max_length = 100,
        help_text = 'Adicione um nome para o marcador.'
    )
    subject = models.ForeignKey(
        Subject,
        verbose_name = 'Disciplina',
        on_delete = models.CASCADE,
        help_text = 'Selecione a discplina a qual o marcador faz parte.'
    )
    parent = models.ForeignKey(
        verbose_name = 'Marcador Superior',
        to = 'Tag',
        blank = True,
        null = True,
        related_name = 'childs',
        on_delete = models.CASCADE,
        help_text = 'Se for o caso, selecione um marcador superior para esse marcador.'
    )
    
    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Marcador'
        verbose_name_plural = 'Marcadores'
