import type { User } from './User';

export interface AuthRequestBody {
    username: string;
    password: string;
}

export interface AuthResponseBody {
    token: string;
    user: User;
}
