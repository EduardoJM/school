from django.db import models

from peoples.models import Teacher
from core.models import ActiveTimestampsMixin
from .common import Subject, Tag
from .references import Exam

QUESTION_LEVEL = [
    ('EF', 'Ensino Fundamental'),
    ('EM', 'Ensino Médio'),
    ('ES', 'Ensino Superior'),
]

class Question(ActiveTimestampsMixin, models.Model):
    short_description = models.CharField(
        verbose_name = 'Descrição Breve',
        max_length = 100,
        help_text = 'Adicione uma breve descrição sobre a questão.'
    )
    exam = models.ForeignKey(
        Exam,
        verbose_name = 'Prova',
        help_text = 'Selecione a prova para qual essa questão faz parte.',
        related_name = 'questions',
        on_delete = models.CASCADE
    )
    text = models.TextField(
        verbose_name = 'Enunciado',
        help_text = 'Escreva o enunciado da questão.'
    )
    level = models.CharField(
        verbose_name = 'Nível',
        max_length = 50,
        choices = QUESTION_LEVEL,
        default = 'EM',
        help_text = 'Selecione o nível da questão.'
    )
    subject = models.ForeignKey(
        Subject,
        verbose_name = 'Disciplina',
        related_name = 'questions',
        on_delete = models.CASCADE,
        help_text = 'Selecione a discplina a qual a questão faz parte.'
    )
    tags = models.ManyToManyField(
        Tag,
        through = 'QuestionTag',
        through_fields = ['question', 'tag'],
        verbose_name = 'Marcadores'
    )

    def __str__(self):
        return self.short_description

    class Meta:
        verbose_name = 'Questão'
        verbose_name_plural = 'Questões'

class QuestionTag(models.Model):
    question = models.ForeignKey(
        Question,
        verbose_name = 'Questão',
        on_delete = models.CASCADE
    )
    tag = models.ForeignKey(
        Tag,
        verbose_name = 'Marcador',
        on_delete = models.CASCADE
    )

    def __str__(self):
        return str(self.tag)

    class Meta:
        verbose_name = 'Marcador de Questão'
        verbose_name_plural = 'Marcadores de Questão'

class QuestionAlternative(models.Model):
    question = models.ForeignKey(
        Question,
        verbose_name = 'Questão',
        related_name = 'alternatives',
        on_delete = models.CASCADE
    )
    text = models.TextField(
        verbose_name = 'Texto',
        help_text='Escreva o texto da alternativa.'
    )
    correct = models.BooleanField(
        verbose_name = 'Alternativa Correta',
        default = False,
        help_text = 'Marque se essa é a alternativa correta.'
    )

    def __str__(self):
        return self.text
    
    class Meta:
        verbose_name = 'Alternativa'
        verbose_name_plural = 'Alternativas'

RESOLUTION_TYPE = [
    ('Vídeo', 'Vídeo'),
    ('Texto', 'Texto'),
    ('Vídeo e Texto', 'Vídeo e Texto'),
]

class QuestionResolution(ActiveTimestampsMixin, models.Model):
    question = models.ForeignKey(
        Question,
        verbose_name = 'Questão',
        related_name = 'resolutions',
        on_delete = models.CASCADE
    )
    teacher = models.ForeignKey(
        Teacher,
        verbose_name = 'Professor',
        related_name = 'resolutions',
        on_delete = models.CASCADE,
    )
    resolution_type = models.CharField(
        verbose_name = 'Tipo de Resolução',
        max_length = 50,
        default = 'Vídeo',
        choices = RESOLUTION_TYPE,
    )
    text = models.TextField(
        verbose_name = 'Enunciado',
        help_text = 'Escreva o enunciado da questão.',
        blank = True,
        default = ''
    )
    video_url = models.URLField(
        verbose_name = 'Vídeo da Resolução',
        max_length = 250,
        blank = True,
        help_text = 'Insira um link de vídeo para a resolução.',
        default = ''
    )
    cover_image = models.ImageField(
        verbose_name = 'Imagem de Capa',
        upload_to = 'images/covers/resolutions',
        help_text = 'Insira uma imagem de capa para a resolução.',
        null = True,
        blank = True
    )

    def __str__(self):
        return 'Resolução do professor ' + str(self.teacher) + ' para a questão ' + str(self.question)

    class Meta:
        verbose_name = 'Resolução'
        verbose_name_plural = 'Resoluções'
