from django.db import models
from django.utils.html import format_html
from core.models import TimestampsMixin

class QuestionImage(TimestampsMixin, models.Model):
    image = models.ImageField(
        verbose_name = 'Imagem',
        upload_to = 'images/resources/questions',
        help_text = 'Selecione a imagem para enviar'
    )
    title = models.CharField(
        verbose_name = 'Título',
        max_length = 100,
    )

    def display_image(self):
        return format_html('<div class="img" style="background-image: url(%s)" title="%s"></div>' % (self.image.url, self.title))
    display_image.short_description = 'Imagem'

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Imagem'
        verbose_name_plural = 'Imagens'
        ordering = ['-id']
