import express from 'express';
import { StudentController } from './StudentController';
import { StudentCreateBodyValidation } from './StudentValidations';
import { UserAvatarUploader } from '../user/UserAvatarUploader';

const controller = new StudentController();
const StudentsRouter = express.Router();

StudentsRouter.post(
    '/',
    UserAvatarUploader,
    StudentCreateBodyValidation,
    controller.create,
);

export { StudentsRouter };
