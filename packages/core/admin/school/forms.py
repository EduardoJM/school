from django import forms

from image_uploader_widget.widgets import ImageUploaderWidget

from core.widgets import RichTextEditor, ReactRichTextEditor, RenderedByOtherWidget
from school.models import Tag

class QuestionForm(forms.ModelForm):
    class Meta:
        widgets = {
            'text': ReactRichTextEditor(),
            'text_rendered': RenderedByOtherWidget(),
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
