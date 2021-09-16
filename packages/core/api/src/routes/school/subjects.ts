import express from 'express';
import { SubjectsController } from '../../controllers';
import { SubjectCreateBodyValidation } from '../../middlewares';

const subjectsRouter = express.Router();

subjectsRouter.post(
    '/',
    // ADD MIDDLEWARES HERE
    SubjectCreateBodyValidation,
    SubjectsController.create,
);

subjectsRouter.get(
    '/',
    // ADD MIDDLEWARES HERE
    SubjectsController.list
);

export default subjectsRouter;
