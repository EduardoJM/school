import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../user/UserEntity';
import {
    responses,
    HTTP_200_OK,
    HTTP_500_INTERNAL_SERVER_ERROR,
    HTTP_404_NOT_FOUND,
    HTTP_401_UNAUTHORIZED,
} from '../../../constants';
import { generateToken } from '../../../utils/jwt';

export interface AuthRequestBody {
    email: string;
    password: string;
}

export class AuthController {
    async auth(request: Request<any, any, AuthRequestBody>, response: Response) {
        const { email, password } = request.body;
        const userRepo = getRepository(User);
        try {
            const user = await userRepo.findOne({
                where: { email },
                relations: ['student', 'admin'],
            });
            if (!user) {
                return response
                    .status(HTTP_404_NOT_FOUND)
                    .json(responses.AUTH_ACCOUNT_NOT_FOUND);
            }
            if(!user.checkIfUnencryptedPasswordIsValid(password)) {
                return response
                    .status(HTTP_401_UNAUTHORIZED)
                    .json(responses.AUTH_WRONG_PASSWORD);
            }
            const token = generateToken({ id: user.id });
            return response.status(HTTP_200_OK).json({
                user: await user.serialize(),
                token,
            });
        } catch (err) {
            console.log(`ERROR: trying to check if a user with determinated e-mail are already registered.\r\n\r\n ${JSON.stringify(err)}`);
            return response.status(HTTP_500_INTERNAL_SERVER_ERROR).json(responses.UNKNOWN_ERROR);
        }
    }
}
