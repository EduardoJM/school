import React, { useMemo } from 'react';
import katex from 'katex';

export interface InlineMathComponentProps {
    decoratedText: string;
}

const InlineMathComponent: React.FC<InlineMathComponentProps> = (props) => {
    const { decoratedText } = props;
    const html = useMemo(() => katex.renderToString(decoratedText.replace('\\(', '').replace('\\)', '')), [decoratedText]);

    return (
        // eslint-disable-next-line react/no-danger
        <span dangerouslySetInnerHTML={{ __html: html }} contentEditable={false} />
    );
};

export default InlineMathComponent;
