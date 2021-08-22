import React from 'react';
import { ToolBarItem } from './ToolBarItem';

export default function createToolBarData(
    toggleInline: (style: string) => void,
    toggleType: (blockType: string) => void,
    onClick: (clickFunction: string) => void,
) : ToolBarItem[] {
    const ToolBarData: ToolBarItem[] = [
        {
            id: 'btn-bold',
            type: 'inline',
            children: (<i className="material-icons">format_bold</i>),
            options: { style: 'BOLD', toggleInline },
        },
        {
            id: 'btn-italic',
            type: 'inline',
            children: (<i className="material-icons">format_italic</i>),
            options: { style: 'ITALIC', toggleInline },
        },
        {
            id: 'btn-underline',
            type: 'inline',
            children: (<i className="material-icons">format_underlined</i>),
            options: { style: 'UNDERLINE', toggleInline },
        },
        {
            id: 'separator-inline',
            type: 'separator',
        },
        {
            id: 'btn-bulleted',
            type: 'block',
            children: (<i className="material-icons">format_list_bulleted</i>),
            options: { blockType: 'unordered-list-item', toggleType },
        },
        {
            id: 'btn-ordered',
            type: 'block',
            children: (<i className="material-icons">format_list_numbered</i>),
            options: { blockType: 'ordered-list-item', toggleType },
        },
        {
            id: 'separator-blocks',
            type: 'separator',
        },
        {
            id: 'btn-image',
            type: 'clickable',
            children: (<i className="material-icons">photo</i>),
            options: { clickFunction: 'add-image', onClick },
        },
        {
            id: 'btn-math',
            type: 'clickable',
            children: (<i className="material-icons">functions</i>),
            options: { clickFunction: 'add-math', onClick },
        },
    ];
    return ToolBarData;
}
