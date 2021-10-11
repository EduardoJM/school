import express from 'express';
import { StatesController } from './StatesController';
import { IsUserAuthenticated } from '../../../middlewares';

const controller = new StatesController();
const StatesRouter = express.Router();

StatesRouter.get(
    '/',
    IsUserAuthenticated,
    controller.list
);
StatesRouter.get(
    '/:uf/',
    IsUserAuthenticated,
    controller.listCities,
)

export { StatesRouter };
