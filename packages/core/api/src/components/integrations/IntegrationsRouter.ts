import express from 'express';
import { ElasticSearchRouter } from './elasticsearch/ElasticSearchRouter';

const IntegrationsRouter = express.Router();

IntegrationsRouter.use('/es', ElasticSearchRouter);

export { IntegrationsRouter };
