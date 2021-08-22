import React, { useMemo, useState } from 'react';
import {
    convertFromRaw,
    convertToRaw,
    EditorState,
    RawDraftContentState,
    RichUtils,
    Modifier,
} from 'draft-js';
import Editor, { composeDecorators } from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createFocusPlugin from '@draft-js-plugins/focus';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import { QueryClient, QueryClientProvider } from 'react-query';

import useModal from '../../Hooks/useModal';
import { ToolBar, createToolBarData } from './ToolBar';
import ImageListModal from './modals/ImageListModal';
import MathExpressionModal from './modals/MathExpressionModal';
import stateToHTML from './utils/stateToHTML';
import createInlineMathPlugin from './Plugins/InlineMath/InlineMath';

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
const inlineMathPlugin = createInlineMathPlugin();

const plugins = [
    focusPlugin,
    alignmentPlugin,
    resizeablePlugin,
    imagePlugin,
    inlineMathPlugin,
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

    const htmlEditorState = useMemo(() => stateToHTML(editorState), [editorState]);

    const rawContentState = useMemo(() => convertToRaw(
        editorState.getCurrentContent(),
    ), [editorState]);

    const selection = editorState.getSelection();
    const currentInlineStyle = editorState.getCurrentInlineStyle();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    const addImageModal = useModal();
    const addExpressionModal = useModal();

    const toolBarData = createToolBarData(
        (style) => setEditorState(RichUtils.toggleInlineStyle(editorState, style)),
        (type) => setEditorState(RichUtils.toggleBlockType(editorState, type)),
        (feat) => {
            if (feat === 'add-image') {
                addImageModal.open();
            } else if (feat === 'add-math') {
                addExpressionModal.open();
            }
        },
    );

    function handleAddImage(id: number, mediaUrl: string, url: string, title: string) {
        addImageModal.close();
        setEditorState((state) => imagePlugin.addImage(state, url, {
            alt: title,
            media_url: mediaUrl,
        }));
    }

    function handleAddMath(expr: string, inline: boolean) {
        if (inline) {
            setEditorState(
                (state) => EditorState.createWithContent(
                    Modifier.insertText(state.getCurrentContent(), state.getSelection(), `\\(${expr}\\)`),
                ),
            );
            addExpressionModal.close();
        }
    }

    return (
        <>
            <ToolBar
                data={toolBarData}
                currentBlockType={blockType}
                currentInlineStyle={currentInlineStyle}
            />
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
                    opened={addImageModal.opened}
                    handleAddImage={handleAddImage}
                    handleClose={addImageModal.close}
                />
            </QueryClientProvider>
            <MathExpressionModal
                opened={addExpressionModal.opened}
                handleClose={addExpressionModal.close}
                handleAddExpression={handleAddMath}
            />
            <input name={name} type="hidden" value={JSON.stringify(rawContentState)} />
            <input name={`${name}_rendered`} type="hidden" value={htmlEditorState} />
        </>
    );
};

export default RichTextEditor;
