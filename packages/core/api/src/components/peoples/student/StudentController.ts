import { Request, Response } from 'express';
import { getCustomRepository, getConnection } from 'typeorm';
import { Student, User } from '../../../entities';
import { UserRepository } from '../user/UserRepository';
import {
    responses,
    HTTP_201_CREATED,
    HTTP_409_CONFLICT,
} from '../../../constants';

export interface StudentCreateRequestBody {
    fullName: string;
    email: string;
    password: string;
    
    displayName?: string;
    useGravatar?: boolean;
    avatar?: string;
}

export class StudentController {
    async create(request: Request<any, any, StudentCreateRequestBody>, response: Response) {
        const {
            fullName, email, password, displayName, useGravatar, avatar
        } = request.body;

        const userRepository = getCustomRepository(UserRepository);
        if (await userRepository.alreadyEmailUsed(email)) {
            return response.status(HTTP_409_CONFLICT).json(responses.EMAIL_ALREADY_USED);
        }

        const user = new User();
        user.fullName = fullName;
        user.email = email;
        user.password = password;
        user.hashPassword();
        user.displayName = displayName || '';
        user.useGravatar = useGravatar !== undefined ? useGravatar : true;
        user.avatar = avatar || '';

        const connection = getConnection();
        let result: any;
        await connection.transaction(async (entityManager) => {
            const student = new Student();
            student.user = await entityManager.save(user);
            const resultStudent = await entityManager.save(student);
            result = await resultStudent.serialize();
        });
        return response.status(HTTP_201_CREATED).json(result);
    }
}
