import httpMocks from 'node-mocks-http';
import { IsUserOfType } from './IsUserOfType';
import { Admin, Student, User } from '../../components/Entities';

describe('IsUserOfType', () => {
    it('A request without user, should return http status 403 with error and message', () => {
        const request = httpMocks.createRequest({
            method: "GET",
            url: "/any-route",
        });
        const response = httpMocks.createResponse();
        IsUserOfType(['ADMIN', 'STUDENT', 'TEACHER', 'UNKNOWN'])(request, response, () => {});
        
        const { statusCode } = response;
        const data = response._getJSONData();

        expect(statusCode).toBe(403);
        expect(Object.prototype.hasOwnProperty.call(data, 'error')).toBe(true);
        expect(Object.prototype.hasOwnProperty.call(data, 'message')).toBe(true);
    });

    it('A request with not allowed user, should return http status 403 with error and message', () => {
        const request = httpMocks.createRequest({
            method: "GET",
            url: "/any-route",
        });
        const response = httpMocks.createResponse();
        const user = new User();
        user.student = new Student();
        request.user = user;

        IsUserOfType(['ADMIN'])(request, response, () => {});
        
        const { statusCode } = response;
        const data = response._getJSONData();

        expect(statusCode).toBe(403);
        expect(Object.prototype.hasOwnProperty.call(data, 'error')).toBe(true);
        expect(Object.prototype.hasOwnProperty.call(data, 'message')).toBe(true);
    });

    it('A request with allowed user, should call the next function', () => {
        const next = jest.fn();
        const request = httpMocks.createRequest({
            method: "GET",
            url: "/any-route",
        });
        const response = httpMocks.createResponse();
        const user = new User();
        user.admin = new Admin();
        request.user = user;

        IsUserOfType(['ADMIN'])(request, response, next);
        
        expect(next).toBeCalledTimes(1);
    });
});
