import express from 'express';
import { TagsController } from './TagsController';
import { TagCreateBodyValidation, TagPartialUpdateCreateBodyValidation } from './TagsValidations';
import { IsUserAuthenticated, IsUserOfType, } from '../../../middlewares';

const TagsRouter = express.Router();
const controller = new TagsController();

TagsRouter.post(
    '/',
    IsUserAuthenticated,
    IsUserOfType(['ADMIN']),
    TagCreateBodyValidation,
    controller.create,
);
TagsRouter.put(
    '/:id',
    IsUserAuthenticated,
    IsUserOfType(['ADMIN']),
    TagCreateBodyValidation,
    controller.updateComplete
);
TagsRouter.patch(
    '/:id',
    IsUserAuthenticated,
    IsUserOfType(['ADMIN']),
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
