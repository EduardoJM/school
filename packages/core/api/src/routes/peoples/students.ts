import express from 'express';
import { StudentController } from '../../controllers';
import { StudentCreateBodyValidation } from '../../middlewares';

const studentsRouter = express.Router();

studentsRouter.post(
    '/',
    // ADD MIDDLEWARES HERE
    StudentCreateBodyValidation,
    StudentController.create,
);

studentsRouter.get(
    '/',
    // ADD MIDDLEWARES HERE
    StudentController.list
);

export default studentsRouter;
