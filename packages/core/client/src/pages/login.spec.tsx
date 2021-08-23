import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import Login from './login';

describe('Login Page', () => {
    it('The login page should be have input for user name, password and a submit button', () => {
        const { getByTestId } = render(<Login />);
        const userName = getByTestId('username-input');
        const password = getByTestId('password-input');
        const submit = getByTestId('submit-button');
        expect(userName).not.toBeUndefined();
        expect(password).not.toBeUndefined();
        expect(submit).not.toBeUndefined();
    });
});
