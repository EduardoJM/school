import React from 'react';
import ReactDOM from 'react-dom';
import RichTextEditor from './RichTextEditor';
import jQuery from 'jquery';
import './styles.scss';

document.addEventListener('DOMContentLoaded', () => {
    function renderRichTextEditor(container: Element) {
        if (container.closest('.empty-form')) {
            return;
        }
        const rawValue = container.getAttribute('data-value');
        let initialValue: any = undefined;
        if (rawValue) {
            try {
                initialValue = JSON.parse(rawValue);
            } catch {}
        }
        const name = container.getAttribute('data-name');
        ReactDOM.render(<RichTextEditor initialValue={initialValue} name={name} />, container);
    }

    function parse(element: Element | HTMLDocument) {
        Array
            .from(element.querySelectorAll('.draft-rte[data-name]'))
            .forEach(renderRichTextEditor)
    }

    parse(document);
    
    jQuery(document).on('formset:added', function(e, row) {
        parse(row[0]);
    });
});
