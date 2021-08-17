import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import RichTextEditor from './RichTextEditor';
import './styles.scss';

document.addEventListener('DOMContentLoaded', () => {
    function renderRichTextEditor(container: Element) {
        if (container.closest('.empty-form')) {
            return;
        }
        const rawValue = container.getAttribute('data-value');
        let initialValue: any;
        if (rawValue) {
            try {
                initialValue = JSON.parse(rawValue);
            } catch {
                initialValue = undefined;
            }
        }
        const name = container.getAttribute('data-name');
        ReactDOM.render(<RichTextEditor initialValue={initialValue} name={name} />, container);
    }

    function parse(element: Element | HTMLDocument) {
        Array
            .from(element.querySelectorAll('.draft-rte[data-name]'))
            .forEach(renderRichTextEditor);
    }

    parse(document);
    jQuery(document).on('formset:added', (e, row) => parse(row[0]));
});
