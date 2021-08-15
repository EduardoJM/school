import React from 'react';

export interface ToolBarButtonProps {
    type?: 'inlineStyle' | 'image';
    inlineStyle?: string;
    onApplyInlineStyle?: (style: string) => void;
    active?: boolean;
}

const ToolBarButton: React.FC<ToolBarButtonProps> = (props) => {
    const {
        children,
        type = 'inlineStyle',
        inlineStyle,
        onApplyInlineStyle,
        active = false,
    } = props;

    function handleClick() {
        if (type === 'inlineStyle' && inlineStyle && onApplyInlineStyle) {
            onApplyInlineStyle(inlineStyle);
        }
    }

    return (
        <button className={active ? 'active' : 'inactive'} type="button" onClick={handleClick}>
            {children}
        </button>
    );
};

export default ToolBarButton;
