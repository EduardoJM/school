import express from 'express';
import { SubjectsController } from './SubjectsController';
import {
    SubjectCreateBodyValidation,
    SubjectPartialUpdateCreateBodyValidation,
} from './SubjectsValidations';
import {
    IsUserAuthenticated,
    IsUserOfType,
} from '../../../middlewares';
import { SubjectsIconUploader } from './SubjectsIconUploader';

const SubjectsRouter = express.Router();
const controller = new SubjectsController();

SubjectsRouter.post(
    '/',
    IsUserAuthenticated,
    IsUserOfType(['ADMIN']),
    SubjectsIconUploader,
    SubjectCreateBodyValidation,
    controller.create,
);
SubjectsRouter.put(
    '/:id',
    IsUserAuthenticated,
    IsUserOfType(['ADMIN']),
    SubjectsIconUploader,
    SubjectCreateBodyValidation,
    controller.updateComplete
);
SubjectsRouter.patch(
    '/:id',
    IsUserAuthenticated,
    IsUserOfType(['ADMIN']),
    SubjectsIconUploader,
    SubjectPartialUpdateCreateBodyValidation,
    controller.updatePartial,
);
SubjectsRouter.delete(
    '/:id',
    IsUserAuthenticated,
    IsUserOfType(['ADMIN']),
    controller.delete,
);
SubjectsRouter.get(
    '/',
    IsUserAuthenticated,
    controller.list
);
SubjectsRouter.get(
    '/:id',
    IsUserAuthenticated,
    controller.getById
);

export { SubjectsRouter };
