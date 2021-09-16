import express from 'express';
import schoolRouter from './school';

const routes = express.Router();

routes.use('/school', schoolRouter);

export default routes;
