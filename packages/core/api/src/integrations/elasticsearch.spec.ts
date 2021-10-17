import { getElasticSearchClient } from './elasticsearch';

describe('Elastic Search integration', () => {
    it('getElasticSearchClient must be return an elasticsearch client', () => {
        const esClient = getElasticSearchClient();

        expect(esClient).not.toBe(null);
        expect(esClient).not.toBe(undefined);
    });
});
