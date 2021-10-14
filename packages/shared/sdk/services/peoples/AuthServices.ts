import { api } from '../../api';
import { User, UserAuth } from '../../entities';

export const AuthServices = {
    async login(email: string, password: string): Promise<UserAuth> {
        const result = await api.post<UserAuth>('/peoples/auth', { email, password, userTypes: ['ADMIN', 'TEACHER'] });
        return result.data;
    },
    async validate(): Promise<User> {
        const result = await api.post<User>('/peoples/auth/validate', { userTypes: ['ADMIN', 'TEACHER'] });
        return result.data;
    },
};
