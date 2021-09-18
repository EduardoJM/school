import express from 'express';
import { SubjectsController } from '../../controllers';
import {
    SubjectCreateBodyValidation,
    IsUserAuthenticated,
    IsUserAdmin,
} from '../../middlewares';

const subjectsRouter = express.Router();

subjectsRouter.post(
    '/',
    IsUserAuthenticated,
    IsUserAdmin,
    SubjectCreateBodyValidation,
    SubjectsController.create,
);

subjectsRouter.get(
    '/',
    IsUserAuthenticated,
    SubjectsController.list
);

export default subjectsRouter;
