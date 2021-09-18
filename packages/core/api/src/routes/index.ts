import express from 'express';
import schoolRouter from './school';
import peoplesRouter from './peoples';

const routes = express.Router();

routes.use('/school', schoolRouter);
routes.use('/peoples', peoplesRouter);

export default routes;
