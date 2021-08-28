import { ContentBlock } from 'draft-js';

export const inlineMathRegex = /\\\(.*?\\\)/gi;

export default function inlineMathStrategy(
    contentBlock: ContentBlock,
    callback: (begin: number, end: number) => void,
): void {
    const text = contentBlock.getText();
    const matches = Array.from(text.matchAll(inlineMathRegex));
    matches.forEach((match) => {
        if (match.index !== undefined) {
            callback(match.index, match.index + match[0].length);
        }
    });
}
