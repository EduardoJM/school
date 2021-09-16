import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import createConnection from './connection';
import { defaults } from './configs';
import routes from './routes';

createConnection().then(async (connection) => {
    if (!connection) {
        return;
    }
    const app = express();

    // TODO: configure cors here
    app.use(cors());
    app.use(express.json());

    app.use(routes);

    const port = process.env.SERVER_PORT || defaults.port;

    app.listen(port, () => {
        console.log(`Inventare api running at http://localhost:${port}`);
    });
});
