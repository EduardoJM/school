import express from 'express';
import { PeoplesRouter } from './peoples/PeoplesRouter';
import { SchoolRouter } from './school/SchoolRouter';
import { GeographicRouter } from './geographics/GeographicRouter';

const Router = express.Router();

Router.use('/peoples', PeoplesRouter);
Router.use('/school', SchoolRouter);
Router.use('/geo', GeographicRouter);

export { Router };
