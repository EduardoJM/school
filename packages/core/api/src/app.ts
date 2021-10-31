import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { Router } from './components/Router';
import { errors } from './middlewares';

dotenv.config();
const app = express();

// TODO: configure cors here
app.use(cors());
app.use(express.json());

app.use(Router);
app.use('/media', express.static(path.resolve(__dirname, '..', 'media')));

app.use(errors());

export { app }
