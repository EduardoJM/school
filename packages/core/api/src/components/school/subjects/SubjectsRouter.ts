import express from 'express';
import { SubjectsController } from './SubjectsController';
import {
    SubjectCreateBodyValidation,
} from './SubjectsValidations';
import {
    IsUserAuthenticated,
    IsUserOfType,
} from '../../../middlewares';

const SubjectsRouter = express.Router();
const controller = new SubjectsController();

SubjectsRouter.post(
    '/',
    IsUserAuthenticated,
    IsUserOfType(['ADMIN']),
    SubjectCreateBodyValidation,
    controller.create,
);

SubjectsRouter.get(
    '/',
    IsUserAuthenticated,
    controller.list
);

export { SubjectsRouter };
