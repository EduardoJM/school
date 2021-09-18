import { Request as ExpressRequest } from 'express';
import { User } from '../entities';

export interface Request extends ExpressRequest {
    user?: User;
}
