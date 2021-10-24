import { Request, Response, NextFunction } from 'express';
import {
    HTTP_403_FORBIDDEN,
    responses,
} from '../../constants';
import { UserType } from '../../components/Entities';

export function IsUserOfType(allowedTypes: UserType[]) {
    return function (request: Request, response: Response, next: NextFunction) {
        if (!request.user) {
            return response.status(HTTP_403_FORBIDDEN).json(responses.AUTH_NO_LOGGED_USER);
        }
        if (!allowedTypes.includes(request.user.getUserType())) {
            return response.status(HTTP_403_FORBIDDEN).json(responses.AUTH_NO_PERMISSION);
        }
        return next();
    }
}
