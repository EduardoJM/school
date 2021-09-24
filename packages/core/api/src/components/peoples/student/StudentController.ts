import { Request, Response } from 'express';
import { getCustomRepository, getRepository, getConnection } from 'typeorm';
import { Student } from './StudentEntity';
import { User } from '../user/UserEntity';
import {
    responses,
    HTTP_201_CREATED,
    HTTP_409_CONFLICT,
    HTTP_500_INTERNAL_SERVER_ERROR,
} from '../../../constants';
import { StudentRepository } from './StudentRepository';

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
        const studentRepo = getRepository(Student);
        const userRepo = getRepository(User);
        try {
            const emailAlreadyUsed = await userRepo.findOne({ email });
            if (emailAlreadyUsed) {
                return response
                    .status(HTTP_409_CONFLICT)
                    .json(responses.EMAIL_ALREADY_USED);
            }
        } catch (err) {
            console.log(`ERROR: trying to check if a user with determinated e-mail are already registered.\r\n\r\n ${JSON.stringify(err)}`);
            return response.status(HTTP_500_INTERNAL_SERVER_ERROR).json(responses.UNKNOWN_ERROR);
        }

        const user = new User();
        user.fullName = fullName;
        user.email = email;
        user.password = password;
        user.hashPassword();
        user.displayName = displayName || '';
        user.useGravatar = useGravatar !== undefined ? useGravatar : true;
        user.avatar = avatar || '';

        let result: any = {};

        const connection = getConnection();
        await connection.transaction(async () => {
            const student = new Student();
            
            const userRepository = getRepository(User);
            const repository = getCustomRepository(StudentRepository);
            student.owner = await userRepository.save(user);

            result = await repository.save(student);
        });

        return response.json(result);
    }

    async list(request: Request, response: Response) {
        // TODO: add try/catch on needed statements
        const connection = getConnection();
        const repository = connection.getCustomRepository(StudentRepository);
        const results = await repository.find();
        return response.json(results);
        /*
        try {
        } catch (err) {
            console.log(`ERROR: trying to load students.\r\n\r\n ${JSON.stringify(err)}`);
            // TODO: add a better error message here.
            return response.status(500).json({});
        }*/
    }
}
