from django.db import models
from django.contrib.auth.models import AbstractUser, Group as BaseGroup

class Group(BaseGroup):
    class Meta(AbstractUser.Meta):
        verbose_name = 'Grupo de Permissões'
        verbose_name_plural = 'Grupos de Permissões'

class User(AbstractUser):
    class Meta(AbstractUser.Meta):
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'

class Teacher(User):
    class Meta(User.Meta):
        verbose_name = 'Professor'
        verbose_name_plural = 'Professores'
