import axios from './axios';
import {
    AuthRequestBody,
    AuthResponseBody,
    User,
 } from '../../types/inventare';
import { AxiosInstance } from 'axios';

const AuthService = {
    auth: async function(data: AuthRequestBody, api?: AxiosInstance): Promise<AuthResponseBody> {
        return (api || axios)
            .post<AuthResponseBody>('auth/', data)
            .then((response) => response.data);
    },

    retrieveAuthenticatedUserData: async function(api?: AxiosInstance): Promise<User> {
        return (api || axios)
            .get<User>('auth/user/')
            .then((response) => response.data);
    },
};

export default AuthService;
