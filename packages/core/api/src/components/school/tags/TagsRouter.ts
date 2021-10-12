import express from 'express';
import { TagsController } from './TagsController';
import { TagCreateBodyValidation, TagPartialUpdateCreateBodyValidation } from './TagsValidations';
import { IsUserAuthenticated, IsUserOfType, } from '../../../middlewares';
import multer from 'multer';

const TagsRouter = express.Router();
const controller = new TagsController();

TagsRouter.post(
    '/',
    IsUserAuthenticated,
    IsUserOfType(['ADMIN']),
    multer().none(),
    TagCreateBodyValidation,
    controller.create,
);
TagsRouter.put(
    '/:id',
    IsUserAuthenticated,
    IsUserOfType(['ADMIN']),
    multer().none(),
    TagCreateBodyValidation,
    controller.updateComplete
);
TagsRouter.patch(
    '/:id',
    IsUserAuthenticated,
    IsUserOfType(['ADMIN']),
    multer().none(),
    TagPartialUpdateCreateBodyValidation,
    controller.updatePartial,
);
TagsRouter.delete(
    '/:id',
    IsUserAuthenticated,
    IsUserOfType(['ADMIN']),
    controller.delete,
);
TagsRouter.get(
    '/',
    IsUserAuthenticated,
    controller.list
);
TagsRouter.get(
    '/:id',
    IsUserAuthenticated,
    controller.getById
);

export { TagsRouter };
