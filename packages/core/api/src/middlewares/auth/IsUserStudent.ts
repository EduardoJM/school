import { Response, NextFunction } from 'express';
import { Request } from '../../utils/express';
import {
    HTTP_401_UNAUTHORIZED,
    responses,
} from '../../constants';

export function IsUserStudent(request: Request, response: Response, next: NextFunction) {
    if (!request.user) {
        return response.status(HTTP_401_UNAUTHORIZED).json(responses.AUTH_NO_LOGGED_USER);
    }
    if (!request.user.isStudent()) {
        return response.status(HTTP_401_UNAUTHORIZED).json(responses.AUTH_ONLY_STUDENT);
    }
    return next();
}