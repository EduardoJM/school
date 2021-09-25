import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../components/Entities';
import {
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND,
    responses,
} from '../../constants';
import { decodeToken } from '../../utils/jwt';

interface JWTTokenBody {
    id: number;
}

export async function IsUserAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    
    if (!authHeader) {
        return response.status(HTTP_401_UNAUTHORIZED).json(responses.AUTH_NO_TOKEN);
    }
    
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return response.status(HTTP_401_UNAUTHORIZED).json(responses.AUTH_WRONG_TOKEN_FORMAT);
    }

    const [schema, token] = parts;
    if (schema.toLowerCase().trim() !== 'bearer') {
        return response.status(HTTP_401_UNAUTHORIZED).json(responses.AUTH_WRONG_TOKEN_FORMAT);
    }

    let id = -1;
    try {
        const decoded = await decodeToken<JWTTokenBody>(token);
        id = decoded.id;
    } catch(err) {
        return response.status(HTTP_401_UNAUTHORIZED).json(responses.AUTH_EXPIRED_TOKEN);
    }
    const userRepo = getRepository(User);
    const user = await userRepo.findOne({
        where: { id },
        relations: ['student', 'admin'],
    });
    if (!user) {
        return response.status(HTTP_404_NOT_FOUND).json(responses.AUTH_USER_NOT_FOUND);
    }
    request.user = user;
    return next();
};