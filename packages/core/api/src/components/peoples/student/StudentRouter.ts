import express from 'express';
import { StudentController } from './StudentController';
import { StudentCreateBodyValidation } from './StudentValidations';

const controller = new StudentController();
const StudentsRouter = express.Router();

StudentsRouter.post(
    '/',
    StudentCreateBodyValidation,
    controller.create,
);

export { StudentsRouter };
