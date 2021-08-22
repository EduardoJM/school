import React from 'react';
import { DraftInlineStyle } from 'draft-js';
import { ToolBarItem, renderItem } from './ToolBarItem';

export interface ToolBarProps {
    data: ToolBarItem[];
    currentInlineStyle: DraftInlineStyle,
    currentBlockType: string,
}

const ToolBar: React.FC<ToolBarProps> = (props) => {
    const { data, currentBlockType, currentInlineStyle } = props;

    return (
        <div className="rte-editor-toolbar">
            {data.map((item) => (
                <React.Fragment key={item.id}>
                    {renderItem(item, currentInlineStyle, currentBlockType)}
                </React.Fragment>
            ))}
        </div>
    );
};

export default ToolBar;
