import { convertFromRaw, EditorState, RawDraftContentState } from 'draft-js';
import stateToHTML from './stateToHTML';

describe('stateToHTML utils', () => {
    it('stateToHTML should be render text block as <p/>', () => {
        const initialState: RawDraftContentState = {
            entityMap: {},
            blocks: [
                {
                    key: '9gm3s',
                    text: 'testing paragraph.',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                },
            ],
        };
        const state = EditorState.createWithContent(convertFromRaw(initialState));
        const html = stateToHTML(state);
        expect(html).toEqual('<p>testing paragraph.</p>');
    });

    it('stateToHTML should be render bold range as <b/>', () => {
        const initialState: RawDraftContentState = {
            entityMap: {},
            blocks: [
                {
                    key: '9gm3s',
                    text: 'testing paragraph.',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [
                        { offset: 1, length: 6, style: 'BOLD' },
                    ],
                    entityRanges: [],
                    data: {},
                },
            ],
        };
        const state = EditorState.createWithContent(convertFromRaw(initialState));
        const html = stateToHTML(state);
        expect(html).toEqual('<p>t<b>esting</b> paragraph.</p>');
    });

    it('stateToHTML should be render italic range as <i/>', () => {
        const initialState: RawDraftContentState = {
            entityMap: {},
            blocks: [
                {
                    key: '9gm3s',
                    text: 'testing paragraph.',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [
                        { offset: 1, length: 6, style: 'ITALIC' },
                    ],
                    entityRanges: [],
                    data: {},
                },
            ],
        };
        const state = EditorState.createWithContent(convertFromRaw(initialState));
        const html = stateToHTML(state);
        expect(html).toEqual('<p>t<i>esting</i> paragraph.</p>');
    });

    it('stateToHTML should be render underline range as <u/>', () => {
        const initialState: RawDraftContentState = {
            entityMap: {},
            blocks: [
                {
                    key: '9gm3s',
                    text: 'testing paragraph.',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [
                        { offset: 1, length: 6, style: 'UNDERLINE' },
                    ],
                    entityRanges: [],
                    data: {},
                },
            ],
        };
        const state = EditorState.createWithContent(convertFromRaw(initialState));
        const html = stateToHTML(state);
        expect(html).toEqual('<p>t<u>esting</u> paragraph.</p>');
    });

    it('stateToHTML should be render strikethrough range as <del/>', () => {
        const initialState: RawDraftContentState = {
            entityMap: {},
            blocks: [
                {
                    key: '9gm3s',
                    text: 'testing paragraph.',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [
                        { offset: 1, length: 6, style: 'STRIKETHROUGH' },
                    ],
                    entityRanges: [],
                    data: {},
                },
            ],
        };
        const state = EditorState.createWithContent(convertFromRaw(initialState));
        const html = stateToHTML(state);
        expect(html).toEqual('<p>t<del>esting</del> paragraph.</p>');
    });
});
