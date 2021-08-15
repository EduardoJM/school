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
            'modules/rich-text-editor/rte.min.js',
        ]
        css = {
            'all': [
                'modules/rich-text-editor/rte.min.css',
            ]
        }

class RenderedByOtherWidget(forms.widgets.HiddenInput):
    template_name = 'widgets/rendered-field.html'
