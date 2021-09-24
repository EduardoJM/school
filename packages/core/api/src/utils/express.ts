import { Request as ExpressRequest } from 'express';
import { User } from '../components/Entities';

export interface Request extends ExpressRequest {
    user?: User;
}
