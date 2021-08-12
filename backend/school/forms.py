from django import forms
from django.contrib.admin.widgets import FilteredSelectMultiple

from image_uploader_widget.widgets import ImageUploaderWidget

from core.widgets import RichTextEditor
from school.models import Tag

class QuestionForm(forms.ModelForm):
    class Meta:
        widgets = {
            'text': RichTextEditor(),
        }

class QuestionAlternativeForm(forms.ModelForm):
    class Meta:
        widgets = {
            'text': RichTextEditor(),
        }

class QuestionResolutionForm(forms.ModelForm):
    class Meta:
        widgets = {
            'text': RichTextEditor(),
            'cover_image': ImageUploaderWidget('Clique para selecionar um arquivo!'),
        }

class SubjectForm(forms.ModelForm):
    class Meta:
        widgets = {
            'icon': ImageUploaderWidget('Clique para selecionar um arquivo!'),
        }
