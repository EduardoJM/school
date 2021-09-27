import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import path from 'path';

import createConnection from './connection';
import { defaults } from './configs';
import { Router } from './components/Router';
import { errors } from './middlewares';

createConnection().then(async (connection) => {
    if (!connection) {
        return;
    }
    const app = express();

    // TODO: configure cors here
    app.use(cors());
    app.use(express.json());

    app.use(Router);
    app.use('/media', express.static(path.resolve(__dirname, '..', 'media')));

    app.use(errors());

    const port = process.env.SERVER_PORT || defaults.port;

    app.listen(port, () => {
        console.log(`Inventare api running at http://localhost:${port}`);
    });
});
