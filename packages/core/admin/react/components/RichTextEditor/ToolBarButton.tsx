import React from 'react';

export interface ToolBarButtonProps {
    type?: 'inlineStyle' | 'clickable';
    inlineStyle?: string;
    onApplyInlineStyle?: (style: string) => void;
    active?: boolean;
    onClick?: () => void;
}

const ToolBarButton: React.FC<ToolBarButtonProps> = (props) => {
    const {
        children,
        type = 'inlineStyle',
        inlineStyle,
        onApplyInlineStyle,
        active = false,
        onClick,
    } = props;

    function handleClick() {
        if (type === 'inlineStyle' && inlineStyle && onApplyInlineStyle) {
            onApplyInlineStyle(inlineStyle);
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
