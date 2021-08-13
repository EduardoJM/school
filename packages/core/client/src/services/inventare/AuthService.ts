import axios from './axios';
import {
    AuthRequestBody,
    AuthResponseBody,
    User,
 } from '../../types/inventare';

const AuthService = {
    auth: async function(data: AuthRequestBody): Promise<AuthResponseBody> {
        return axios
            .post<AuthResponseBody>('auth/', data)
            .then((response) => response.data);
    },

    retrieveAuthenticatedUserData: async function(): Promise<User> {
        return axios
            .get<User>('auth/user/')
            .then((response) => response.data);
    },
};

export default AuthService;
