import http from 'http';
import { app } from './app';
import { defaults } from './configs';
import createConnection from './connection';

const port = Number(process.env.SERVER_PORT || defaults.port);
app.set('port', port);

createConnection().then(async (connection) => {
    if (!connection) {
        return;
    }
    const server = http.createServer(app);
    server.listen(port, () => {
        console.log('The inventare API is runing...');
    });
});

