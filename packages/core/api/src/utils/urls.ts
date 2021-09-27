import { defaults } from '../configs';

export function buildUrl(path: string): string {
    return `${defaults.imageBaseUrl}${path}`;
}
