import { errorUtils } from './errorsUtils';

describe('errorsUtils', () => {
    it('The getDisplayErrorMessage must be return the default message if err.response.data.message not exists', () => {
        expect(errorUtils.getDisplayErrorMessage(undefined, 'TEST')).toBe('TEST');

        expect(errorUtils.getDisplayErrorMessage(null, 'TEST')).toBe('TEST');

        let err = {};
        expect(errorUtils.getDisplayErrorMessage(err, 'TEST')).toBe('TEST');

        err = { response: {} };
        expect(errorUtils.getDisplayErrorMessage(err, 'TEST')).toBe('TEST');

        err = { response: { data: { } } };
        expect(errorUtils.getDisplayErrorMessage(err, 'TEST')).toBe('TEST');

        err = { response: { data: { message: undefined } } };
        expect(errorUtils.getDisplayErrorMessage(err, 'TEST')).toBe('TEST');
    });

    it('The getDisplayErrorMessage must be return the err.response.data.message if it exists', () => {
        const message = 'Another Brick in The Wall';
        const err = { response: { data: { message } } };
        expect(errorUtils.getDisplayErrorMessage(err, 'TEST')).toBe(message);
    });
});
