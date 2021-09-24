import express from 'express';
import { PeoplesRouter } from './peoples/PeoplesRouter';
import { SchoolRouter } from './school/SchoolRouter';

const Router = express.Router();

Router.use('/peoples', PeoplesRouter);
Router.use('/school', SchoolRouter);

export { Router };
