import React from 'react';

export interface ToolBarButtonProps {
    type?: 'inlineStyle' | 'blockType' | 'clickable';
    inlineStyle?: string;
    blockType?: string;
    onToggleStyle?: (style: string) => void;
    onToggleBlockType?: (type: string) => void;
    active?: boolean;
    clickFunction?: string;
    onClick?: (clickFunction: string) => void;
}

const ToolBarButton: React.FC<ToolBarButtonProps> = (props) => {
    const {
        children,
        type = 'inlineStyle',
        inlineStyle,
        blockType,
        onToggleStyle,
        onToggleBlockType,
        active = false,
        clickFunction,
        onClick,
    } = props;

    function handleClick() {
        if (type === 'inlineStyle' && inlineStyle && onToggleStyle) {
            onToggleStyle(inlineStyle);
        } else if (type === 'blockType' && blockType && onToggleBlockType) {
            onToggleBlockType(blockType);
        } else if (type === 'clickable' && onClick && clickFunction) {
            onClick(clickFunction);
        }
    }

    return (
        <button className={active ? 'active' : 'inactive'} type="button" onClick={handleClick}>
            {children}
        </button>
    );
};

export default ToolBarButton;
