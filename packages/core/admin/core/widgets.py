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

class ReactRichTextEditor(forms.Widget):
    template_name = 'widgets/react-rte.html'

    class Media:
        js = [
            'https://unpkg.com/react@17.0.2/umd/react.development.js',
            'https://unpkg.com/react-dom@17/umd/react-dom.development.js',
            'admin/js/rich-text-editor.min.js',
        ]
        css = {
            'all': [
                'admin/css/rich-text-editor.css',
            ]
        }

class RenderedByOtherWidget(forms.widgets.HiddenInput):
    template_name = 'widgets/rendered-field.html'
    