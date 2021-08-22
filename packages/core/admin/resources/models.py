from django.db import models

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

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Imagem'
        verbose_name_plural = 'Imagens'
        ordering = ['-id']
