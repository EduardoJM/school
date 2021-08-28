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
                const style: Record<string, any> = {
                    display: 'block',
                };
                if (data.alignment === 'center') {
                    style['margin-left'] = 'auto';
                    style['margin-right'] = 'auto';
                } else if (data.alignment === 'left') {
                    style.float = 'left';
                } else if (data.alignment === 'right') {
                    style.float = 'right';
                }
                if (data.width !== undefined && data.width !== 0) {
                    style.width = `${data.width}%`;
                    style.height = 'auto';
                }
                return {
                    element: 'img',
                    attributes: {
                        src: `{% BASE_MEDIA_URL %}/${data.media_url}`,
                    },
                    style,
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
