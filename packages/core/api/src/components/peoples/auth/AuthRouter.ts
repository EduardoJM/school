import express from 'express';
import { AuthController } from './AuthController';
import { AuthRequestBodyValidation, ValidateRequestBodyValidation } from './AuthValidations';
import { IsUserAuthenticated } from '../../../middlewares';

const AuthRouter = express.Router();
const controller = new AuthController();

AuthRouter.post(
    '/',
    AuthRequestBodyValidation,
    controller.auth,
);

AuthRouter.get(
    '/validate',
    IsUserAuthenticated,
    ValidateRequestBodyValidation,
    controller.validate,
);

export { AuthRouter };
