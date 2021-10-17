import http from 'http';
import { app } from './app';
import { defaults } from './configs';

const port = Number(process.env.SERVER_PORT || defaults.port);
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
    console.log('The inventare API is runing...');
});
