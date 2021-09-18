import jwt from 'jsonwebtoken';
import { defaults } from '../configs';

export function generateToken(params: any = {}) {
    const secret = process.env.JWT_SECRET || defaults.jwtSecret;
    return jwt.sign(params, secret, {
        expiresIn: '2 years',
    });
};

export async function decodeToken<T>(token: string): Promise<T> {
    const secret = process.env.JWT_SECRET || defaults.jwtSecret;
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded as T);
        });
    });
}
