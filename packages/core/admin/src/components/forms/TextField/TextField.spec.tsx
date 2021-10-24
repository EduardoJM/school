import { RefObject, useRef } from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { TextField } from './TextField';

describe('components/forms/TextField', () => {
    it('The TextField component must be have a text input', () => {
        const name = 'textfield';
        const { queryAllByRole } = render(
            <Form onSubmit={() => {}}>
                <TextField name={name} />
            </Form>
        );

        const input = queryAllByRole('textbox');
        
        expect(input.length).toBe(1);
        expect(input[0].tagName).toBe('INPUT');
        expect(input[0].getAttribute('type')).toBe('text');
        expect(input[0].getAttribute('name')).toBe(name);
    });

    it('The TextField component must be change the value in input if initialData seted in form', () => {
        const text = 'This is my text';
        const { queryAllByRole } = render(
            <Form onSubmit={() => {}} initialData={{ text }}>
                <TextField name="text" />
            </Form>
        );
        
        const [input] = queryAllByRole('textbox');
        const textbox = input as HTMLInputElement;

        expect(textbox.value).toBe(text);
    });

    it('Set the Form data must be change the TextField input value', () => {
        const text = 'the answer for life the universe and everything';
        let formRef: RefObject<FormHandles> | undefined;
        const FormComponent = () => {
            formRef = useRef<FormHandles>(null);
            return (
                <Form onSubmit={() => {}} ref={formRef} initialData={{ text }}>
                    <TextField name="text" />
                </Form>
            );
        };
        const { queryAllByRole } = render(<FormComponent />);

        const [input] = queryAllByRole('textbox');
        const textbox = input as HTMLInputElement;

        expect(formRef).not.toBeUndefined();
        expect(textbox.value).toBe(text);
        expect(formRef?.current?.getData()).toMatchObject({ text });
        
        act(() => {
            formRef?.current?.setData({ text: 'new age' });
        });
        
        expect(textbox.value).toBe('new age');
        expect(formRef?.current?.getData()).toMatchObject({ text: 'new age' });
    });

    it('Changing the input value must be change the TextField value', () => {
        let formRef: RefObject<FormHandles> | undefined;
        const FormComponent = () => {
            formRef = useRef<FormHandles>(null);
            return (
                <Form onSubmit={() => {}} ref={formRef} initialData={{ text: '' }}>
                    <TextField name="text" />
                </Form>
            );
        };
        const { queryAllByRole } = render(<FormComponent />);

        const [input] = queryAllByRole('textbox');
        const textbox = input as HTMLInputElement;

        expect(formRef).not.toBeUndefined();
        expect(textbox.value).toBe('');
        expect(formRef?.current?.getData()).toMatchObject({ text: '' });

        act(() => {
            fireEvent.change(textbox, { target: { value: 'my age is 42' } });
        });

        expect(formRef?.current?.getData()).toMatchObject({ text: 'my age is 42' });
    });

    it('Clear form data must be change the TextField value to defaultValue', () => {
        const text = 'my age is 42';
        let formRef: RefObject<FormHandles> | undefined;
        const FormComponent = () => {
            formRef = useRef<FormHandles>(null);
            return (
                <Form onSubmit={() => {}} ref={formRef} initialData={{ text }}>
                    <TextField name="text" />
                </Form>
            );
        };
        const { queryAllByRole } = render(<FormComponent />);

        const [input] = queryAllByRole('textbox');
        const textbox = input as HTMLInputElement;

        expect(formRef).not.toBeUndefined();

        act(() => {
            formRef?.current?.setData({ text: 'new age is 44' });
        });

        expect(textbox.value).toBe('new age is 44');
        expect(formRef?.current?.getData()).toMatchObject({ text: 'new age is 44' });

        act(() => {
            formRef?.current?.clearField('text');
        });

        expect(textbox.value).toBe(text);
        expect(formRef?.current?.getData()).toMatchObject({ text });
    });
});