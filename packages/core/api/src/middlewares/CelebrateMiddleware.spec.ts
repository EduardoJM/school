import httpMocks from 'node-mocks-http';
import { celebrate, CelebrateError, Joi } from 'celebrate';
import { errors } from './CelebrateMiddleware';

describe('CelebrateMiddleware', () => {
    it('Calling errors with non-celebrate error, should call next with the error', () => {
        const next = jest.fn();
        const request = httpMocks.createRequest({
            method: "POST",
            url: "/any-route",
        });
        const response = httpMocks.createResponse();
        const err = new Error('Any wrong occurs');

        errors()(err, request, response, next);

        expect(next).toBeCalledTimes(1);
        expect(next.mock.calls[0][0]).toBe(err);
    });

    it('Calling errors with celebrate error, should return http status 400 with error and message', () => {
        const next = jest.fn();
        const err = new CelebrateError('Wrong celebrate error', {
            celebrated: true,
        });
        const request = httpMocks.createRequest({
            method: "POST",
            url: "/any-route",
        });
        const response = httpMocks.createResponse();
        
        errors()(err, request, response, next);

        const data = response._getJSONData();

        expect(response.statusCode).toBe(400);
        expect(Object.prototype.hasOwnProperty.call(data, 'error')).toBe(true);
        expect(Object.prototype.hasOwnProperty.call(data, 'message')).toBe(true);
    });

    it('Calling errors with celebrate error, should return http status 400 with error and the first validation error as message', async () => {
        const request = httpMocks.createRequest({
            method: "POST",
            url: "/any-route",
        });
        const response = httpMocks.createResponse();
        const middleware = celebrate({
            body: { name: Joi.string().required() },
        });
        const error: CelebrateError = await new Promise((resolve) => middleware(request, response, (err) => resolve(err)));

        expect(error).not.toBeNull();
        errors()(error, request, response, () => {});
        
        const data = response._getJSONData();

        expect(response.statusCode).toBe(400);
        expect(Object.prototype.hasOwnProperty.call(data, 'error')).toBe(true);
        expect(Object.prototype.hasOwnProperty.call(data, 'message')).toBe(true);
    });
});
