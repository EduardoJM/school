import express from 'express';
import { SubjectsRouter } from './subjects/SubjectsRouter';
import { TagsRouter } from './tags/TagsRouter';

const SchoolRouter = express.Router();

SchoolRouter.use('/subjects', SubjectsRouter);
SchoolRouter.use('/tags', TagsRouter);

export { SchoolRouter };
