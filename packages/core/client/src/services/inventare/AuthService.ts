import axios from './axios';
import {
    AuthRequestBody,
    AuthResponseBody,
    AuthRefreshRequestBody,
    AuthRefreshResponseBody,
 } from '../../types/inventare';

export default class AuthService {
    static async auth(data: AuthRequestBody): Promise<AuthResponseBody> {
        return axios
            .post<AuthResponseBody>('auth/', data)
            .then((response) => response.data);
    }

    static async refreshAuth(data: AuthRefreshRequestBody): Promise<AuthRefreshResponseBody> {
        return axios
            .post<AuthRefreshResponseBody>('auth/refresh/', data)
            .then((response) => response.data);
    }
}
