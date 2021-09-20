import { User } from './User';

export interface UserAuth {
    user: User;
    token: string;
}
