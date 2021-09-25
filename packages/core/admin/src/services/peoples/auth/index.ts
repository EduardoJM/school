import { api } from '../../api';
import { User, UserAuth } from '../../../entities';

export async function login(email: string, password: string): Promise<UserAuth> {
    const result = await api.post<UserAuth>('/peoples/auth', { email, password, userTypes: ['ADMIN', 'TEACHER'] });
    return result.data;
}

export async function validate(): Promise<User> {
    const result = await api.post<User>('/peoples/auth/validate', { userTypes: ['ADMIN', 'TEACHER'] });
    return result.data;
}
