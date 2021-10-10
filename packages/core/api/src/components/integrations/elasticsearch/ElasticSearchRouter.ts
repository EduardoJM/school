import express from 'express';
import { ElasticSearchController } from './ElasticSearchController';
import { IsUserAuthenticated, IsUserOfType, } from '../../../middlewares';

const ElasticSearchRouter = express.Router();
const controller = new ElasticSearchController();

ElasticSearchRouter.post(
    '/recreate',
    IsUserAuthenticated,
    IsUserOfType(['ADMIN']),
    controller.recreate,
);

export { ElasticSearchRouter };
