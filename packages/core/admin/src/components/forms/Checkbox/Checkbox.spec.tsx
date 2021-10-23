import { render } from '@testing-library/react';
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
});
