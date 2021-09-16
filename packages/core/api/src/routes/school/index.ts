import express from 'express';
import subjectsRouter from './subjects';

const schoolRouter = express.Router();

schoolRouter.use('/subjects', subjectsRouter);

export default schoolRouter;
