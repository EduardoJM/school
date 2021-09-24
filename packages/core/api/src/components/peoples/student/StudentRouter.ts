import express from 'express';
import { StudentController } from './StudentController';
import { StudentCreateBodyValidation } from './StudentValidations';

const controller = new StudentController();
const studentsRouter = express.Router();

studentsRouter.post(
    '/',
    // ADD MIDDLEWARES HERE
    StudentCreateBodyValidation,
    controller.create,
);

studentsRouter.get(
    '/',
    // ADD MIDDLEWARES HERE
    controller.list
);

export default studentsRouter;
