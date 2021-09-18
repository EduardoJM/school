import express from 'express';
import studentsRouter from './students';
import authRouter from './auth';

const peoplesRouter = express.Router();

peoplesRouter.use('/students', studentsRouter);
peoplesRouter.use('/auth', authRouter);

export default peoplesRouter;
