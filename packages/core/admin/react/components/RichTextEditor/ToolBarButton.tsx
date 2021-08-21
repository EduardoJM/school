import React from 'react';

export interface ToolBarButtonProps {
    type?: 'inlineStyle' | 'blockType' | 'clickable';
    inlineStyle?: string;
    blockType?: string;
    onApplyInlineStyle?: (style: string) => void;
    onApplyBlockType?: (style: string) => void;
    active?: boolean;
    onClick?: () => void;
}

const ToolBarButton: React.FC<ToolBarButtonProps> = (props) => {
    const {
        children,
        type = 'inlineStyle',
        inlineStyle,
        blockType,
        onApplyInlineStyle,
        onApplyBlockType,
        active = false,
        onClick,
    } = props;

    function handleClick() {
        if (type === 'inlineStyle' && inlineStyle && onApplyInlineStyle) {
            onApplyInlineStyle(inlineStyle);
        } else if (type === 'blockType' && blockType && onApplyBlockType) {
            onApplyBlockType(blockType);
        } else if (type === 'clickable' && onClick) {
            onClick();
        }
    }

    return (
        <button className={active ? 'active' : 'inactive'} type="button" onClick={handleClick}>
            {children}
        </button>
    );
};

export default ToolBarButton;
