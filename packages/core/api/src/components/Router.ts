import express from 'express';
import { PeoplesRouter } from './peoples/PeoplesRouter';
import { SchoolRouter } from './school/SchoolRouter';
import { IntegrationsRouter } from './integrations/IntegrationsRouter';
import { GeographicRouter } from './geographic/GeographicRouter';

const Router = express.Router();

Router.use('/peoples', PeoplesRouter);
Router.use('/school', SchoolRouter);
Router.use('/integrations', IntegrationsRouter);
Router.use('/geo', GeographicRouter);

export { Router };
