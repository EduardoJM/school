import axios from 'axios';
import * as next from 'next';
import { parseCookies } from 'nookies';

export const baseURL = 'http://localhost:8000/api/v1';

export function getAPIClient(
    ctx?: Pick<next.NextPageContext, 'req'> | { req: next.NextApiRequest; } | null | undefined,
    url?: string,
) {
    const { '@inventare_auth_token': token } = parseCookies(ctx);

    const instance = axios.create({ baseURL: (url || baseURL) });
    if (token) {
        instance.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return instance;
}
