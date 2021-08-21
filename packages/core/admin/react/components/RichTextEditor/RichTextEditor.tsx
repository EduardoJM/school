import React, { useMemo, useState } from 'react';
import {
    convertFromRaw,
    convertToRaw,
    EditorState,
    RawDraftContentState,
    RichUtils,
} from 'draft-js';
import Editor, { composeDecorators } from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createFocusPlugin from '@draft-js-plugins/focus';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import { stateToHTML } from 'draft-js-export-html';
import { QueryClient, QueryClientProvider } from 'react-query';

import ToolBar from './ToolBar';
import ToolBarButton from './ToolBarButton';
import ToolBarSeparator from './ToolBarSeparator';
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

const queryClient = new QueryClient();

interface RichTextEditorProps {
    name: string;
    initialValue?: Object;
}

const RichTextEditor: React.FC<RichTextEditorProps> = (props) => {
    const { name, initialValue } = props;
    const [editorState, setEditorState] = useState(() => {
        if (!initialValue) {
            return EditorState.createEmpty();
        }
        try {
            return EditorState.createWithContent(
                convertFromRaw(initialValue as RawDraftContentState),
            );
        } catch {
            return EditorState.createEmpty();
        }
    });
    const htmlEditorState = useMemo(() => stateToHTML(editorState.getCurrentContent(), {
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
                        src: data.src,
                    },
                    style,
                };
            }
            return undefined;
        },
    }), [editorState]);
    const rawContentState = useMemo(() => convertToRaw(
        editorState.getCurrentContent(),
    ), [editorState]);
    const [addImageModal, setAddImageModal] = useState(false);

    const currentInlineStyle = editorState.getCurrentInlineStyle();
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    function handleToggleInlineStyle(style: string) {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    }

    function handleToggleBlockType(type: string) {
        setEditorState(RichUtils.toggleBlockType(editorState, type));
    }

    function handleAddImage(id: number, url: string, title: string) {
        setEditorState((state) => imagePlugin.addImage(state, url, {
            alt: title,
            image_id: id,
        }));
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
                    onApplyInlineStyle={handleToggleInlineStyle}
                    active={currentInlineStyle.has('BOLD')}
                >
                    <i className="material-icons">format_bold</i>
                </ToolBarButton>
                <ToolBarButton
                    inlineStyle="ITALIC"
                    onApplyInlineStyle={handleToggleInlineStyle}
                    active={currentInlineStyle.has('ITALIC')}
                >
                    <i className="material-icons">format_italic</i>
                </ToolBarButton>
                <ToolBarButton
                    inlineStyle="UNDERLINE"
                    onApplyInlineStyle={handleToggleInlineStyle}
                    active={currentInlineStyle.has('UNDERLINE')}
                >
                    <i className="material-icons">format_underlined</i>
                </ToolBarButton>
                <ToolBarSeparator />
                <ToolBarButton
                    type="blockType"
                    blockType="unordered-list-item"
                    onApplyBlockType={handleToggleBlockType}
                    active={blockType === 'unordered-list-item'}
                >
                    <i className="material-icons">format_list_bulleted</i>
                </ToolBarButton>
                <ToolBarButton
                    type="blockType"
                    blockType="ordered-list-item"
                    onApplyBlockType={handleToggleBlockType}
                    active={blockType === 'ordered-list-item'}
                >
                    <i className="material-icons">format_list_numbered</i>
                </ToolBarButton>
                <ToolBarSeparator />
                <ToolBarButton
                    type="clickable"
                    onClick={handleShowImageModal}
                >
                    <i className="material-icons">photo</i>
                </ToolBarButton>
            </ToolBar>
            <div className="rte-editor-container">
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    plugins={plugins}
                />
                <AlignmentTool />
                <div className="clear" />
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
