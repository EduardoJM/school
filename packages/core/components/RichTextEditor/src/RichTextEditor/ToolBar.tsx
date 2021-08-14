import React from 'react';

const ToolBar: React.FC = ({ children }) => {
    return (
        <div className="rte-editor-toolbar">
            {children}
        </div>
    );
};

export default ToolBar;
