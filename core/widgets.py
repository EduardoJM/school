from django import forms

class RichTextEditor(forms.Widget):
    template_name = 'widgets/quill.html'

    class Media:
        js = [
            'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js',
            'https://cdn.quilljs.com/1.3.6/quill.min.js',
            'admin/js/QuillEditor.js',
        ]
        css = {
            'all': [
                'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css',
                'admin/css/quill.inventare.css',
            ]
        }