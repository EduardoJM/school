import { api } from '../../api';
import { UserAuth } from '../../../entities';

export async function login(email: string, password: string): Promise<UserAuth> {
    const result = await api.post<UserAuth>('/peoples/auth', { email, password });
    return result.data;
}
