import express from 'express';
import studentsRouter from './students';

const peoplesRouter = express.Router();

peoplesRouter.use('/students', studentsRouter);

export default peoplesRouter;
