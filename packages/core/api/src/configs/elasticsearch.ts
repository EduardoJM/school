import elasticsearch from 'elasticsearch';
import { defaults } from '../configs';

export function getElasticSearchClient() {
    const host = process.env.ELASTIC_SEARCH_HOST || defaults.elasticHost;
    const port = process.env.ELASTIC_SEARCH_PORT || defaults.elasticPort;
    const client = new elasticsearch.Client({
        host: `${host}:${port}`,
        log: 'trace',
    });
    return client;
}
