import axios from 'axios';
import * as next from 'next';
import { parseCookies } from 'nookies';

export const baseURL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1`;

export function getAPIClient(
    context?: Pick<next.NextPageContext, 'req'> | { req: next.NextApiRequest; } | null | undefined,
    production?: boolean,
) {
    const { '@inventare_auth_token': token } = parseCookies(context);

    const instance = axios.create({ baseURL: (production ? `${process.env.NEXT_PUBLIC_API_URL || 'http://admin:8000'}/api/v1` : baseURL) });
    if (token) {
        instance.defaults.headers.Authorization = `Bearer ${token}`;
    }

    return instance;
}
