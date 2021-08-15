from django import forms

from image_uploader_widget.widgets import ImageUploaderWidget

from core.widgets import RichTextEditor, RenderedByOtherWidget

class QuestionForm(forms.ModelForm):
    class Meta:
        widgets = {
            'text': RichTextEditor(),
            'text_rendered': RenderedByOtherWidget(),
        }

class QuestionAlternativeForm(forms.ModelForm):
    class Meta:
        widgets = {
            'text': RichTextEditor(),
            'text_rendered': RenderedByOtherWidget(),
        }

class QuestionResolutionForm(forms.ModelForm):
    class Meta:
        widgets = {
            'text': RichTextEditor(),
            'text_rendered': RenderedByOtherWidget(),
            'cover_image': ImageUploaderWidget('Clique para selecionar um arquivo!'),
        }

class SubjectForm(forms.ModelForm):
    class Meta:
        widgets = {
            'icon': ImageUploaderWidget('Clique para selecionar um arquivo!'),
        }
