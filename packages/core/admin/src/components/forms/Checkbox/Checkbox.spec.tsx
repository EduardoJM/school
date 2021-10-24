import { RefObject, useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Checkbox } from './Checkbox';

describe('components/forms/Checkbox', () => {
    it('The Checkbox component must be have a checkbox input', () => {
        const name = 'my-checkbox';
        const { queryAllByRole } = render(
            <Form onSubmit={() => {}}>
                <Checkbox name={name} />
            </Form>
        );

        const input = queryAllByRole('checkbox');
        
        expect(input.length).toBe(1);
        expect(input[0].tagName).toBe('INPUT');
        expect(input[0].getAttribute('type')).toBe('checkbox');
        expect(input[0].getAttribute('name')).toBe(name);
    });

    it('The Checkbox component must be change the checked in input if initialData seted in form', () => {
        const { queryAllByRole } = render(
            <Form onSubmit={() => {}} initialData={{ checkbox1: true, checkbox2: false }}>
                <Checkbox name="checkbox1" />
                <Checkbox name="checkbox2" />
            </Form>
        );
        
        const inputs = queryAllByRole('checkbox');
        const [input1] = inputs.filter((item) => item.getAttribute('name') === 'checkbox1');
        const [input2] = inputs.filter((item) => item.getAttribute('name') === 'checkbox2');
        const checkbox1 = input1 as HTMLInputElement;
        const checkbox2 = input2 as HTMLInputElement;

        expect(checkbox1.checked).toBe(true);
        expect(checkbox2.checked).toBe(false);
    });

    it('Set the Form data must be change the Checkbox checked value', () => {
        let formRef: RefObject<FormHandles> | undefined;
        const FormComponent = () => {
            formRef = useRef<FormHandles>(null);
            return (
                <Form onSubmit={() => {}} ref={formRef} initialData={{ checkbox: true }}>
                    <Checkbox name="checkbox" />
                </Form>
            );
        };
        const { queryAllByRole } = render(<FormComponent />);

        const [input] = queryAllByRole('checkbox');
        const checkbox = input as HTMLInputElement;

        expect(formRef).not.toBeUndefined();
        expect(checkbox.checked).toBe(true);
        expect(formRef?.current?.getData()).toMatchObject({ checkbox: true });
        
        formRef?.current?.setData({ checkbox: false });
        
        expect(checkbox.checked).toBe(false);
        expect(formRef?.current?.getData()).toMatchObject({ checkbox: false });
    });

    it('Click in the checkbox must be change it value', () => {
        let formRef: RefObject<FormHandles> | undefined;
        const FormComponent = () => {
            formRef = useRef<FormHandles>(null);
            return (
                <Form onSubmit={() => {}} ref={formRef} initialData={{ checkbox: true }}>
                    <Checkbox name="checkbox" />
                </Form>
            );
        };
        const { queryAllByRole } = render(<FormComponent />);

        const [input] = queryAllByRole('checkbox');
        const checkbox = input as HTMLInputElement;

        expect(formRef).not.toBeUndefined();
        expect(checkbox.checked).toBe(true);
        expect(formRef?.current?.getData()).toMatchObject({ checkbox: true });

        fireEvent.click(checkbox);

        expect(checkbox.checked).toBe(false);
        expect(formRef?.current?.getData()).toMatchObject({ checkbox: false });
    });

    it('Clear form data must be change the checkbox value to defaultValue', () => {
        let formRef: RefObject<FormHandles> | undefined;
        const FormComponent = () => {
            formRef = useRef<FormHandles>(null);
            return (
                <Form onSubmit={() => {}} ref={formRef} initialData={{ checkbox: true }}>
                    <Checkbox name="checkbox" />
                </Form>
            );
        };
        const { queryAllByRole } = render(<FormComponent />);

        const [input] = queryAllByRole('checkbox');
        const checkbox = input as HTMLInputElement;

        expect(formRef).not.toBeUndefined();

        formRef?.current?.setData({ checkbox: false });

        expect(checkbox.checked).toBe(false);
        expect(formRef?.current?.getData()).toMatchObject({ checkbox: false });

        formRef?.current?.clearField('checkbox');

        expect(checkbox.checked).toBe(true);
        expect(formRef?.current?.getData()).toMatchObject({ checkbox: true });
    });
});
