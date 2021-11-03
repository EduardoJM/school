import * as http from 'http';
import { User } from '../../entities';

declare module 'express-serve-static-core' {
    export interface Request extends http.IncomingMessage, Express.Request {
        user?: User;
    }
}
