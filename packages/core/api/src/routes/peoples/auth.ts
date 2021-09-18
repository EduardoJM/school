import express from 'express';
import { AuthController } from '../../controllers';
import { AuthRequestBodyValidation } from '../../middlewares';

const authRouter = express.Router();

authRouter.post(
    '/',
    AuthRequestBodyValidation,
    AuthController.auth,
);

export default authRouter;
