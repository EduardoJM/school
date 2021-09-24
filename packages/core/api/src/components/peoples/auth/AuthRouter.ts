import express from 'express';
import { AuthController } from './AuthController';
import { AuthRequestBodyValidation } from './AuthValidations';

const AuthRouter = express.Router();
const controller = new AuthController();

AuthRouter.post(
    '/',
    AuthRequestBodyValidation,
    controller.auth,
);

export { AuthRouter };
