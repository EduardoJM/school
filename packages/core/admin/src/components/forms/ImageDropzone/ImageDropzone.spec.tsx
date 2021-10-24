import { RefObject, useRef } from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { ImageDropzone } from './ImageDropzone';

describe('components/forms/ImageDropzone', () => {
    it('The ImageDropzone component must be have a file input', () => {
        const name = 'any';
        const { getByTestId } = render(
            <Form onSubmit={() => {}}>
                <ImageDropzone name={name} />
            </Form>
        );

        const input = getByTestId('input');
        
        expect(input.tagName).toBe('INPUT');
        expect(input.getAttribute('type')).toBe('file');
    });
});
