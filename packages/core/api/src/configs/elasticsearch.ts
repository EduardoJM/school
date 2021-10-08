import elasticsearch from 'elasticsearch';

export function getElasticSearchClient() {
    const client = new elasticsearch.Client({
        host: 'localhost:9200',
        log: 'trace',
    });
    return client;
}
