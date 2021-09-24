import express from 'express';
import authRouter from './auth';

const peoplesRouter = express.Router();

peoplesRouter.use('/auth', authRouter);

export default peoplesRouter;
