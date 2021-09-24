import express from 'express';
import { AuthRouter } from './auth/AuthRouter';
import { StudentsRouter } from './student/StudentRouter';

const PeoplesRouter = express.Router();

PeoplesRouter.use('/auth', AuthRouter);
PeoplesRouter.use('/students', StudentsRouter);

export { PeoplesRouter };
