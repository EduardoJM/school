from datetime import datetime

from django.db import models

from core.models import ActiveTimestampsMixin

UFS = [
    ('BR', 'Brasil'),
    ('ND', 'Não Determinado'),
    ('AC', 'Acre'),
    ('AL', 'Alagoas'),
    ('AP', 'Amapá'),
    ('AM', 'Amazonas'),
    ('BA', 'Bahia'),
    ('CE', 'Ceará'),
    ('DF', 'Distrito Federal'),
    ('ES', 'Espirito Santo'),
    ('GO', 'Goiás'),
    ('MA', 'Maranhão'),
    ('MT', 'Mato Grosso'),
    ('MS', 'Mato Grosso do Sul'),
    ('MG', 'Minas Gerais'),
    ('PA', 'Pará'),
    ('PB', 'Paraiba'),
    ('PR', 'Paraná'),
    ('PE', 'Pernambuco'),
    ('PI', 'Piauí'),
    ('RJ', 'Rio de Janeiro'),
    ('RN', 'Rio Grande do Norte'),
    ('RS', 'Rio Grande do Sul'),
    ('RO', 'Rondônia'),
    ('RR', 'Roraima'),
    ('SC', 'Santa Catarina'),
    ('SP', 'São Paulo'),
    ('SE', 'Sergipe'),
    ('TO', 'Tocantins')
]

class Institution(ActiveTimestampsMixin, models.Model):
    name = models.CharField(
        'Nome',
        max_length = 100,
        unique = True,
        help_text = 'Adicione um nome para a instituição.'
    )
    site = models.URLField(
        'Site',
        help_text = 'Adicione um site para a instituição.'
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Instituição'
        verbose_name_plural = 'Instituições'

class Exam(ActiveTimestampsMixin, models.Model):
    name = models.CharField(
        'Nome',
        max_length = 100,
        help_text = 'Adicione um nome para a prova.'
    )
    institution = models.ForeignKey(
        Institution,
        verbose_name = 'Instituição',
        help_text = 'Selecione uma instituição para a referência.',
        on_delete = models.CASCADE,
        related_name = 'exams'
    )
    year = models.IntegerField(
        'Ano',
        help_text = 'Selecione o ano de aplicação'
    )
    link = models.URLField(
        'Link',
        help_text = 'Adicione um link para a referência.'
    )
    access_date = models.DateTimeField(
        'Data',
        default = datetime.now,
        blank = True,
        help_text = 'Adicione a data de acesso da referência.'
    )
    uf = models.CharField(
        'Estado',
        max_length = 2,
        choices = UFS,
        help_text = 'Selecione o estado onde a prova foi aplicada. No caso de contemplar mais de um estado, selecione BR.'
    )

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Prova'
        verbose_name_plural = 'Provas'
        unique_together = ['name', 'year']
