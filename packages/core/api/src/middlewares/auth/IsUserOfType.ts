import { Response, NextFunction } from 'express';
import { Request } from '../../utils/express';
import {
    HTTP_401_UNAUTHORIZED,
    responses,
} from '../../constants';
import { UserType } from '../../components/Entities';

export function IsUserOfType(allowedTypes: UserType[]) {
    return function (request: Request, response: Response, next: NextFunction) {
        if (!request.user) {
            return response.status(HTTP_401_UNAUTHORIZED).json(responses.AUTH_NO_LOGGED_USER);
        }
        if (!allowedTypes.includes(request.user.getUserType())) {
            return response.status(HTTP_401_UNAUTHORIZED).json(responses.AUTH_NO_PERMISSION);
        }
        return next();
    }
}