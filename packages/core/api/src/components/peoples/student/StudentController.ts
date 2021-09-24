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
        const userRepository = getRepository(User);
        try {
            const emailAlreadyUsed = await userRepository.findOne({ email });
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

        const connection = getConnection();
        let result: any;
        try {
            await connection.transaction(async (entityManager) => {
                const student = new Student();
                student.user = await entityManager.save(user);
                const resultStudent = await entityManager.save(student);
                result = await resultStudent.serialize();
            });
            return response.status(HTTP_201_CREATED).json(result);
        } catch(err) {
            console.log(`ERROR: trying to save a new student.\r\n\r\n ${JSON.stringify(err)}`);
            return response.status(HTTP_500_INTERNAL_SERVER_ERROR).json(responses.UNKNOWN_ERROR);
        }
    }

    async list(request: Request, response: Response) {
        // TODO: add try/catch on needed statements
        // TODO: TEMPORARY ROUTE
        const repository = getRepository(Student);
        const results = await repository.find({
            relations: ['user'],
        });
        const result = await Promise.all(results.map(async(student) => await student.serialize()));
        return response.json(result);
        /*
        try {
        } catch (err) {
            console.log(`ERROR: trying to load students.\r\n\r\n ${JSON.stringify(err)}`);
            // TODO: add a better error message here.
            return response.status(500).json({});
        }*/
    }
}
