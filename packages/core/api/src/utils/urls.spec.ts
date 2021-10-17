import { buildUrl } from './urls';
import { defaults } from '../configs';

describe("URL Utils", () => {
    it('The buildUrl must be return a string containing the parsed string', () => {
        const basePath = '/media/path.png';
        const url = buildUrl(basePath);

        expect(typeof url).toBe('string');
        expect(url).toMatch(new RegExp(url, 'i'));
        expect(url).toMatch(new RegExp(defaults.imageBaseUrl, 'i'));
    });
});
