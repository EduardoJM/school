import React from 'react';
import { EditorPlugin } from '@draft-js-plugins/editor';

import InlineMathComponent, { InlineMathComponentProps } from './InlineMathComponent';
import inlineMathStrategy from './strategy';

export default function createInlineMathPlugin(): EditorPlugin {
    const DecoratedInlineMath = (props: InlineMathComponentProps) => (
        <InlineMathComponent {...props} />
    );

    return {
        decorators: [
            {
                strategy: inlineMathStrategy,
                component: DecoratedInlineMath,
            },
        ],
    };
}
