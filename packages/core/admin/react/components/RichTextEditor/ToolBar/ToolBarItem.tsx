import React, { ReactNode } from 'react';
import { DraftInlineStyle } from 'draft-js';

import ToolBarButton from './ToolBarButton';

export interface ToolBarItemOptionsMap {
    inline: {
        style: string;
        toggleInline: (style: string) => void;
    },
    block: {
        blockType: string;
        toggleType: (blockType: string) => void;
    },
    clickable: {
        clickFunction: string;
        onClick: (clickFunction: string) => void;
    },
}

export interface ToolBarItemType<K extends keyof ToolBarItemOptionsMap> {
    type: K;
    id: string;
    options: ToolBarItemOptionsMap[K];
    children: ReactNode;
}

export interface ToolBarSeparator {
    type: 'separator';
    id: string;
}

export type ToolBarItem =
    ToolBarItemType<'block'> |
    ToolBarItemType<'clickable'> |
    ToolBarItemType<'inline'> |
    ToolBarSeparator;

export function renderItem(
    item: ToolBarItem,
    currentInlineStyle: DraftInlineStyle,
    currentBlockType: string,
): ReactNode {
    if (item.type === 'block') {
        return (
            <ToolBarButton
                type="blockType"
                onToggleBlockType={item.options.toggleType}
                blockType={item.options.blockType}
                active={item.options.blockType === currentBlockType}
            >
                {item.children}
            </ToolBarButton>
        );
    }
    if (item.type === 'inline') {
        return (
            <ToolBarButton
                type="inlineStyle"
                onToggleStyle={item.options.toggleInline}
                inlineStyle={item.options.style}
                active={currentInlineStyle.has(item.options.style)}
            >
                {item.children}
            </ToolBarButton>
        );
    }
    if (item.type === 'clickable') {
        return (
            <ToolBarButton
                type="clickable"
                clickFunction={item.options.clickFunction}
                onClick={item.options.onClick}
            >
                {item.children}
            </ToolBarButton>
        );
    }
    if (item.type === 'separator') {
        return <span className="separator" />;
    }
    return null;
}
