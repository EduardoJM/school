import express from 'express';
import { SubjectsRouter } from './subjects/SubjectsRouter';

const SchoolRouter = express.Router();

SchoolRouter.use('/subjects', SubjectsRouter);

export { SchoolRouter };
