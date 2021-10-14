export type UserType = 'STUDENT' | 'ADMIN' | 'TEACHER';

export interface User {
    id: number;
    type: UserType;
    fullName: string;
    displayName: string;
    email: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
}
