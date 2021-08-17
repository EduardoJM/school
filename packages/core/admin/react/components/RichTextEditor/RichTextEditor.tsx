import React, { useRef, useMemo, useState } from 'react';
import { convertFromRaw, convertToRaw, EditorState, RawDraftContentState, RichUtils } from 'draft-js';
import Editor, { composeDecorators } from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createFocusPlugin from '@draft-js-plugins/focus';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import { stateToHTML } from 'draft-js-export-html';
import { QueryClient, QueryClientProvider } from 'react-query'

import ToolBar from './ToolBar';
import ToolBarButton from './ToolBarButton';
import ImageListModal from './ImageListModal';

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
);
const imagePlugin = createImagePlugin({ decorator });

const plugins = [
    focusPlugin,
    alignmentPlugin,
    resizeablePlugin,
    imagePlugin,
];

const queryClient = new QueryClient()

interface RichTextEditorProps {
    name: string;
    initialValue?: Object;
}

const RichTextEditor: React.FC<RichTextEditorProps> = (props) => {
    const { name, initialValue } = props;

    const [editorState, setEditorState] = React.useState(() => {
        if (!initialValue) {
            return EditorState.createEmpty();
        }
        try {
            return EditorState.createWithContent(convertFromRaw(initialValue as RawDraftContentState));
        } catch {
            return EditorState.createEmpty();
        }
    });
    const currentInlineStyle = useMemo(() => {
        return editorState.getCurrentInlineStyle();
    }, [editorState]);
    const htmlEditorState = useMemo(() => {
        return stateToHTML(editorState.getCurrentContent(), {
            entityStyleFn: (entity: any) => {
                const entityType = entity.get('type').toLowerCase();
                if (entityType === 'image') {
                    const data = entity.getData();
                    console.log(data);
                    let style = {
                        display: 'block',
                    };
                    if (data.alignment === 'center') {
                        style['margin-left'] = 'auto';
                        style['margin-right'] = 'auto';
                    } else if (data.alignment === 'left') {
                        style['float'] = 'left';
                    } else if (data.alignment === 'right') {
                        style['float'] = 'right';
                    }
                    if (data.width !== undefined && data.width !== 0) {
                        style['width'] = `${data.width}%`;
                        style['height'] = 'auto'
                    }
                    return {
                        element: 'img',
                        attributes: {
                            src: data.src,
                        },
                        style,
                    };
                }
            },                      
        });
    }, [editorState]);
    const rawContentState = useMemo(() => {
        return convertToRaw(editorState.getCurrentContent());
    }, [editorState]);
    const editorRef = useRef<Editor>();
    const [addImageModal, setAddImageModal] = useState(false);

    function handleEditorContainerClick() {
        if (editorRef.current) {
            editorRef.current.focus();
        }
    }

    function handleApplyInlineStyle(style: string) {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    }

    function handleAddImage(id: number, url: string, title: string) {
        setEditorState((state) => {
            return imagePlugin.addImage(state, url, {
                alt: title,
                image_id: id,
            });
        });
        setAddImageModal(false);
    }

    function handleCloseImageModal() {
        setAddImageModal(false);
    }

    function handleShowImageModal() {
        setAddImageModal(true);
    }

    return (
        <>
            <ToolBar>
                <ToolBarButton
                    inlineStyle="BOLD"
                    onApplyInlineStyle={handleApplyInlineStyle}
                    active={currentInlineStyle.has('BOLD')}
                >
                    <i className="material-icons">format_bold</i>
                </ToolBarButton>
                <ToolBarButton
                    inlineStyle="ITALIC"
                    onApplyInlineStyle={handleApplyInlineStyle}
                    active={currentInlineStyle.has('ITALIC')}
                >
                    <i className="material-icons">format_italic</i>
                </ToolBarButton>
                <ToolBarButton
                    inlineStyle="UNDERLINE"
                    onApplyInlineStyle={handleApplyInlineStyle}
                    active={currentInlineStyle.has('UNDERLINE')}
                >
                    <i className="material-icons">format_underlined</i>
                </ToolBarButton>
                <ToolBarButton
                    type='clickable'
                    onClick={handleShowImageModal}
                >
                    <i className="material-icons">photo</i>
                </ToolBarButton>
            </ToolBar>
            <div className="rte-editor-container" onClick={handleEditorContainerClick}>
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    plugins={plugins}
                    ref={editorRef}
                />
                <AlignmentTool />
                <div className="clear"></div>
            </div>
            <QueryClientProvider client={queryClient}>
                <ImageListModal
                    opened={addImageModal}
                    handleAddImage={handleAddImage}
                    handleClose={handleCloseImageModal}
                />
            </QueryClientProvider>
            <input name={name} type="hidden" value={JSON.stringify(rawContentState)} />
            <input name={`${name}_rendered`} type="hidden" value={htmlEditorState} />
        </>
    );
};

export default RichTextEditor;
