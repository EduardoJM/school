import { EditorState } from 'draft-js';
import { stateToHTML as rawStateToHTML } from 'draft-js-export-html';

export default function stateToHTML(editorState: EditorState): string {
    return rawStateToHTML(editorState.getCurrentContent(), {
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
}
