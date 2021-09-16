import express from 'express';
import { SubjectsController } from '../../controllers';

const subjectsRouter = express.Router();

subjectsRouter.post(
    '/',
    // ADD MIDDLEWARES HERE
    SubjectsController.create
);

subjectsRouter.get(
    '/',
    // ADD MIDDLEWARES HERE
    SubjectsController.list
);

export default subjectsRouter;
