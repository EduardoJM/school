# Generated by Django 3.2.5 on 2021-08-22 17:21

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='questionimage',
            options={'ordering': ['-id'], 'verbose_name': 'Imagem', 'verbose_name_plural': 'Imagens'},
        ),
        migrations.AddField(
            model_name='questionimage',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2021, 8, 22, 14, 21, 23, 789251), verbose_name='Criado em'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='questionimage',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, verbose_name='Atualizado em'),
        ),
    ]