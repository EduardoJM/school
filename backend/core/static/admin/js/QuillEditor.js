'use strict';
{
    const $ = django.jQuery;

    const toolbarConfig = [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'align': [] }],
        ['formula', 'link', 'image'],
        ['clean'],
    ]

    $(document).ready(function(){
        function initQuills(element) {
            $(element).find('.quill-editor-container').each(function(el) {
                if ($(this).closest('.empty-form').length > 0) {
                    return;
                }
                const editor = $(this).find('.quill-editor').get(0);
                const quill = new Quill(editor, {
                    modules: {
                        toolbar: toolbarConfig,
                    },
                    theme: 'snow',
                });
                const QuillWrapper = {
                    quill: quill,
                    getInput: function(el) {
                        const parent = el.parentElement;
                        if(parent !== null && parent !== undefined) {
                            return parent.querySelector('input[type=hidden]');
                        }
                        return null;
                    },
                    textChange: function() {
                        const input = this.getInput(this.quill.container);
                        const html = this.quill.container.getElementsByClassName('ql-editor')[0].innerHTML;
                        input.value = html;
                    },
                    init: function() {
                        this.textChange = this.textChange.bind(this);
                        this.quill.on('text-change', this.textChange);
                        const value = this.getInput(this.quill.container).value;
                        this.quill.container.getElementsByClassName('ql-editor')[0].innerHTML = value;
                    }
                };
                QuillWrapper.init();
            });
        }
        initQuills(document.body);

        $(document).on('formset:added', function(e, row) {
            initQuills(row);
        });
    });
}
