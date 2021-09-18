import jwt from 'jsonwebtoken';
import { defaults } from '../configs';

export function generateToken(params: any = {}) {
    return jwt.sign(params, process.env.JWT_SECRET || defaults.jwtSecret, {
        expiresIn: '2 years',
    });
};
