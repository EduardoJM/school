from django import forms
from image_uploader_widget.widgets import ImageUploaderWidget

class QuestionImageForm(forms.ModelForm):
    class Meta:
        widgets = {
            'image': ImageUploaderWidget('Clique para selecionar um arquivo!'),
        }