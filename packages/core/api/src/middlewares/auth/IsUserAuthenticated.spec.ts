import httpMocks from 'node-mocks-http';
import { createConnection, getRepository } from 'typeorm';
import { IsUserAuthenticated } from './IsUserAuthenticated';
import { generateToken } from '../../utils/jwt';
import { Entities, User } from '../../components/Entities';

describe('IsUserAuthenticated', () => {
    it('A request without authorization header, should return http status 401 with error and message', async () => {
        const request = httpMocks.createRequest({
            method: "GET",
            url: "/any-route",
            headers: { }
        });
        const response = httpMocks.createResponse();
        await IsUserAuthenticated(request, response, () => {});
        
        const { statusCode } = response;
        const data = response._getJSONData();

        expect(statusCode).toBe(401);
        expect(Object.prototype.hasOwnProperty.call(data, 'error')).toBe(true);
        expect(Object.prototype.hasOwnProperty.call(data, 'message')).toBe(true);
    });

    it('A request with empty authorization header, should return http status 401 with error and message', async () => {
        const request = httpMocks.createRequest({
            method: "GET",
            url: "/any-route",
            headers: {
                Authorization: '',
            }
        });
        const response = httpMocks.createResponse();
        await IsUserAuthenticated(request, response, () => {});
        
        const { statusCode } = response;
        const data = response._getJSONData();

        expect(statusCode).toBe(401);
        expect(Object.prototype.hasOwnProperty.call(data, 'error')).toBe(true);
        expect(Object.prototype.hasOwnProperty.call(data, 'message')).toBe(true);
    });

    it('A request with invalid authorization header, should return http status 401 with error and message', async () => {
        let request = httpMocks.createRequest({
            method: "GET",
            url: "/any-route",
            headers: {
                Authorization: 'the answer',
            }
        });
        let response = httpMocks.createResponse();
        await IsUserAuthenticated(request, response, () => {});
        let data = response._getJSONData();

        expect(response.statusCode).toBe(401);
        expect(Object.prototype.hasOwnProperty.call(data, 'error')).toBe(true);
        expect(Object.prototype.hasOwnProperty.call(data, 'message')).toBe(true);

        request = httpMocks.createRequest({
            method: "GET",
            url: "/any-route",
            headers: {
                Authorization: 'the answer to life the universe and everything',
            }
        });
        response = httpMocks.createResponse();
        await IsUserAuthenticated(request, response, () => {});
        data = response._getJSONData();

        expect(response.statusCode).toBe(401);
        expect(Object.prototype.hasOwnProperty.call(data, 'error')).toBe(true);
        expect(Object.prototype.hasOwnProperty.call(data, 'message')).toBe(true);
    });

    it('A request with invalid token in authorization header, should return http status 401 with error and message', async () => {
        const request = httpMocks.createRequest({
            method: "GET",
            url: "/any-route",
            headers: {
                Authorization: 'Bearer answer',
            }
        });
        const response = httpMocks.createResponse();
        await IsUserAuthenticated(request, response, () => {});
        
        const { statusCode } = response;
        const data = response._getJSONData();

        expect(statusCode).toBe(401);
        expect(Object.prototype.hasOwnProperty.call(data, 'error')).toBe(true);
        expect(Object.prototype.hasOwnProperty.call(data, 'message')).toBe(true);
    });

    it('A request with valid token in authorization header and no database, should return http status 500 with error and message', async () => {
        const request = httpMocks.createRequest({
            method: "GET",
            url: "/any-route",
            headers: {
                Authorization: `Bearer ${generateToken({ id: 1 })}`,
            }
        });
        const response = httpMocks.createResponse();
        await IsUserAuthenticated(request, response, () => {});
        
        const { statusCode } = response;
        const data = response._getJSONData();

        expect(statusCode).toBe(500);
        expect(Object.prototype.hasOwnProperty.call(data, 'error')).toBe(true);
        expect(Object.prototype.hasOwnProperty.call(data, 'message')).toBe(true);
    });

    it('A request with valid token in authorization header and database with valid user id, should add user to request and call next function', async () => {
        const conn = await createConnection({
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            entities: Entities,
            synchronize: true,
            logging: false,
        });

        const repo = getRepository(User);
        const user = new User();
        user.fullName = 'Arthur Dent';
        user.email = 'arthur.dent@example.com.br';
        const savedUser = await repo.save(user);

        const next = jest.fn();
        const request = httpMocks.createRequest({
            method: "GET",
            url: "/any-route",
            headers: {
                Authorization: `Bearer ${generateToken({ id: savedUser.id })}`,
            }
        });
        const response = httpMocks.createResponse();
        await IsUserAuthenticated(request, response, next);
        
        const { statusCode } = response;
        
        expect(statusCode).toBe(200);
        expect(request.user).not.toBeUndefined();
        expect(request.user).not.toBeNull();
        expect(request.user?.id).toBe(savedUser.id);
        expect(next).toBeCalledTimes(1);

        await conn.close();
    });

    it('A request with valid token in authorization header and database with invalid user id, should return http status 404 with error and message', async () => {
        const conn = await createConnection({
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            entities: Entities,
            synchronize: true,
            logging: false,
        });

        const next = jest.fn();
        const request = httpMocks.createRequest({
            method: "GET",
            url: "/any-route",
            headers: {
                Authorization: `Bearer ${generateToken({ id: 1 })}`,
            }
        });
        const response = httpMocks.createResponse();
        await IsUserAuthenticated(request, response, next);
        
        const { statusCode } = response;
        const data = response._getJSONData();
        
        expect(statusCode).toBe(404);
        expect(Object.prototype.hasOwnProperty.call(data, 'error')).toBe(true);
        expect(Object.prototype.hasOwnProperty.call(data, 'message')).toBe(true);

        await conn.close();
    });
});
