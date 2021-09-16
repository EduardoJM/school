import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { defaults } from './configs';

const app = express();

// TODO: configure cors here
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'oie' }));

const port = process.env.SERVER_PORT || defaults.port;

app.listen(port, () => {
    console.log(`Inventare api running at http://localhost:${port}`);
});
