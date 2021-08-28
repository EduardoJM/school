import { EditorState } from 'draft-js';
import { stateToHTML as rawStateToHTML } from 'draft-js-export-html';
import katex from 'katex';
import { inlineMathRegex } from '../Plugins/InlineMath/strategy';

export default function stateToHTML(editorState: EditorState): string {
    const rendered = rawStateToHTML(editorState.getCurrentContent(), {
        inlineStyles: {
            BOLD: { element: 'b' },
            ITALIC: { element: 'i' },
        },
        entityStyleFn: (entity: any) => {
            const entityType = entity.get('type').toLowerCase();
            if (entityType === 'image') {
                const data = entity.getData();
                const style: Record<string, any> = {};
                // alignment support
                if (data.alignment === 'center') {
                    style['margin-left'] = 'auto';
                    style['margin-right'] = 'auto';
                } else if (data.alignment === 'left') {
                    style.float = 'left';
                } else if (data.alignment === 'right') {
                    style.float = 'right';
                }
                // resizing support
                if (data.width !== undefined && data.width !== 0) {
                    style.width = `${data.width}%`;
                    style.height = 'auto';
                }
                // determine the src based on the media_url or src
                let { src } = data;
                if (data.media_url) {
                    src = `{% BASE_MEDIA_URL %}/${data.media_url}`;
                }
                return {
                    element: 'img',
                    attributes: { src },
                    style: Object.keys(style).length > 0 ? style : undefined,
                };
            }
            return undefined;
        },
    });
    // render inline math
    const matches = Array.from(rendered.matchAll(inlineMathRegex));
    let outputRendered = '';
    let lastIndex = 0;
    matches.forEach((match) => {
        if (match.index !== undefined) {
            outputRendered += rendered.substring(lastIndex, match.index);
            const expr = match[0];
            outputRendered += katex.renderToString(expr.replace('\\(', '').replace('\\)', ''), { displayMode: false });
            lastIndex = match.index + expr.length;
        }
    });
    outputRendered += rendered.substring(lastIndex);
    return outputRendered;
}
