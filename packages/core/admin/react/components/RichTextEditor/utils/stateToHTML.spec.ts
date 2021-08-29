import {
    convertFromRaw,
    EditorState,
    RawDraftContentState,
    RawDraftInlineStyleRange,
} from 'draft-js';
import katex from 'katex';
import stateToHTML from './stateToHTML';

function createImageBlockState(
    type: 'media' | 'src',
    source: string,
    alignment?: 'left' | 'right' | 'center',
    width?: number | undefined,
): RawDraftContentState {
    return {
        blocks: [
            {
                key: '17mil',
                text: ' ',
                type: 'atomic',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [{ offset: 0, length: 1, key: 0 }],
                data: {},
            },
        ],
        entityMap: {
            0: {
                type: 'IMAGE',
                mutability: 'IMMUTABLE',
                data: {
                    alt: 'testing',
                    src: type === 'src'
                        ? source
                        : `https://example.com/media/${source}`,
                    media_url: type === 'media' ? source : undefined,
                    alignment,
                    width,
                },
            },
        },
    };
}

function createUnstyledBlockState(
    text: string,
    style?: RawDraftInlineStyleRange,
): RawDraftContentState {
    return {
        entityMap: {},
        blocks: [
            {
                key: '9gm3s',
                text,
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: style ? [style] : [],
                entityRanges: [],
                data: {},
            },
        ],
    };
}

describe('stateToHTML utils', () => {
    it('stateToHTML should be render text block as <p/>', () => {
        const initialState = createUnstyledBlockState('testing paragraph.');
        const state = EditorState.createWithContent(convertFromRaw(initialState));
        const html = stateToHTML(state);
        expect(html).toEqual('<p>testing paragraph.</p>');
    });

    it('stateToHTML should be render bold range as <b/>', () => {
        const initialState = createUnstyledBlockState('testing paragraph.', { offset: 1, length: 6, style: 'BOLD' });
        const state = EditorState.createWithContent(convertFromRaw(initialState));
        const html = stateToHTML(state);
        expect(html).toEqual('<p>t<b>esting</b> paragraph.</p>');
    });

    it('stateToHTML should be render italic range as <i/>', () => {
        const initialState = createUnstyledBlockState('testing paragraph.', { offset: 1, length: 6, style: 'ITALIC' });
        const state = EditorState.createWithContent(convertFromRaw(initialState));
        const html = stateToHTML(state);
        expect(html).toEqual('<p>t<i>esting</i> paragraph.</p>');
    });

    it('stateToHTML should be render underline range as <u/>', () => {
        const initialState = createUnstyledBlockState('testing paragraph.', { offset: 1, length: 6, style: 'UNDERLINE' });
        const state = EditorState.createWithContent(convertFromRaw(initialState));
        const html = stateToHTML(state);
        expect(html).toEqual('<p>t<u>esting</u> paragraph.</p>');
    });

    it('stateToHTML should be render strikethrough range as <del/>', () => {
        const initialState = createUnstyledBlockState('testing paragraph.', { offset: 1, length: 6, style: 'STRIKETHROUGH' });
        const state = EditorState.createWithContent(convertFromRaw(initialState));
        const html = stateToHTML(state);
        expect(html).toEqual('<p>t<del>esting</del> paragraph.</p>');
    });

    it('stateToHTML should be render inline tex equation delimited by \\( and \\) with KaTeX', () => {
        const initialState = createUnstyledBlockState('testing \\(2x=y\\) paragraph.');
        const state = EditorState.createWithContent(convertFromRaw(initialState));
        const html = stateToHTML(state);
        const tex = katex.renderToString('2x=y', { displayMode: false });
        expect(html).toEqual(`<p>testing ${tex} paragraph.</p>`);
    });

    it('stateToHTML should be render a image block with media_url property using {% BASE_MEDIA_URL %} instread of complete url', () => {
        const initialState = createImageBlockState('media', 'testing.png');
        const state = EditorState.createWithContent(convertFromRaw(initialState));
        const html = stateToHTML(state);
        expect(html).toEqual('<figure><img src="{% BASE_MEDIA_URL %}/testing.png">&nbsp;</img></figure>');
    });

    it('stateToHTML should be render a image block without media_url property using complete url', () => {
        const initialState = createImageBlockState('src', 'https://example.com/media/testing.png');
        const state = EditorState.createWithContent(convertFromRaw(initialState));
        const html = stateToHTML(state);
        expect(html).toEqual('<figure><img src="https://example.com/media/testing.png">&nbsp;</img></figure>');
    });

    it('stateToHTML should be render a image block with right align as float: right style', () => {
        const state = EditorState.createWithContent(convertFromRaw(createImageBlockState(
            'src',
            'https://example.com/media/testing.png',
            'right',
        )));
        expect(
            stateToHTML(state),
        ).toMatch(/<img(.*?)style="(.*?)float:(.*?)right(.*?)"(.*?)>(.*?)<\/img>/gi);
    });

    it('stateToHTML should be render a image block with left align as float: left style', () => {
        const state = EditorState.createWithContent(convertFromRaw(createImageBlockState(
            'src',
            'https://example.com/media/testing.png',
            'left',
        )));
        expect(
            stateToHTML(state),
        ).toMatch(/<img(.*?)style="(.*?)float:(.*?)left(.*?)"(.*?)>(.*?)<\/img>/gi);
    });

    it('stateToHTML should be render a image block with center align as margin-left and margin-right: auto style', () => {
        const state = EditorState.createWithContent(convertFromRaw(createImageBlockState(
            'src',
            'https://example.com/media/testing.png',
            'center',
        )));
        const html = stateToHTML(state);
        expect(html).toMatch(/<img(.*?)style="(.*?)margin-left:(.*?)auto(.*?)"(.*?)>(.*?)<\/img>/gi);
        expect(html).toMatch(/<img(.*?)style="(.*?)margin-right:(.*?)auto(.*?)"(.*?)>(.*?)<\/img>/gi);
    });

    it('stateToHTML should be render a image block with center align and width as margin-left and margin-right: auto and width style', () => {
        const state = EditorState.createWithContent(convertFromRaw(createImageBlockState(
            'src',
            'https://example.com/media/testing.png',
            'center',
            50,
        )));
        const html = stateToHTML(state);
        expect(html).toMatch(/<img(.*?)style="(.*?)margin-left:(.*?)auto(.*?)"(.*?)>(.*?)<\/img>/gi);
        expect(html).toMatch(/<img(.*?)style="(.*?)margin-right:(.*?)auto(.*?)"(.*?)>(.*?)<\/img>/gi);
        expect(html).toMatch(/<img(.*?)style="(.*?)width:(.*?)50%(.*?)"(.*?)>(.*?)<\/img>/gi);
        expect(html).toMatch(/<img(.*?)style="(.*?)height:(.*?)auto(.*?)"(.*?)>(.*?)<\/img>/gi);
    });

    it('stateToHTML should be render a image block with left align and width as float: left and width style', () => {
        const state = EditorState.createWithContent(convertFromRaw(createImageBlockState(
            'src',
            'https://example.com/media/testing.png',
            'left',
            40,
        )));
        const html = stateToHTML(state);
        expect(html).toMatch(/<img(.*?)style="(.*?)float:(.*?)left(.*?)"(.*?)>(.*?)<\/img>/gi);
        expect(html).toMatch(/<img(.*?)style="(.*?)width:(.*?)40%(.*?)"(.*?)>(.*?)<\/img>/gi);
        expect(html).toMatch(/<img(.*?)style="(.*?)height:(.*?)auto(.*?)"(.*?)>(.*?)<\/img>/gi);
    });

    it('stateToHTML should be render a image block with right align and width as float: right and width style', () => {
        const state = EditorState.createWithContent(convertFromRaw(createImageBlockState(
            'src',
            'https://example.com/media/testing.png',
            'right',
            30,
        )));
        const html = stateToHTML(state);
        expect(html).toMatch(/<img(.*?)style="(.*?)float:(.*?)right(.*?)"(.*?)>(.*?)<\/img>/gi);
        expect(html).toMatch(/<img(.*?)style="(.*?)width:(.*?)30%(.*?)"(.*?)>(.*?)<\/img>/gi);
        expect(html).toMatch(/<img(.*?)style="(.*?)height:(.*?)auto(.*?)"(.*?)>(.*?)<\/img>/gi);
    });
});
