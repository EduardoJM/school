import express from 'express';
import { StatesRouter } from './States/StatesRouter';

const GeographicRouter = express.Router();

GeographicRouter.use('/states', StatesRouter);

export { GeographicRouter };
