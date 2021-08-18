import { AxiosInstance } from 'axios';
import axios from './axios';
import {
    AuthRequestBody,
    AuthResponseBody,
    User,
} from '../../types/inventare';

const AuthService = {
    async auth(data: AuthRequestBody, api?: AxiosInstance): Promise<AuthResponseBody> {
        return (api || axios)
            .post<AuthResponseBody>('auth/', data)
            .then((response) => response.data);
    },

    async retrieveAuthenticatedUserData(api?: AxiosInstance): Promise<User> {
        return (api || axios)
            .get<User>('auth/user/')
            .then((response) => response.data);
    },
};

export default AuthService;
