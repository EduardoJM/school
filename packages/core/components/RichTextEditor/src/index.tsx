import React from 'react';
import ReactDOM from 'react-dom';
import RichTextEditor from './RichTextEditor';

function renderRichTextEditor(container: Element) {
    const rawValue = container.getAttribute('data-value');
    let initialValue: any = undefined;
    if (rawValue) {
        initialValue = JSON.parse(rawValue);
    }
    const name = container.getAttribute('data-name');
    ReactDOM.render(<RichTextEditor initialValue={initialValue} name={name} />, container);
}

document.addEventListener('DOMContentLoaded', () => {
    Array
        .from(document.querySelectorAll('.draft-rte[data-name]'))
        .forEach((element) => renderRichTextEditor(element))
});
