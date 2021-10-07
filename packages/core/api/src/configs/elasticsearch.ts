import elasticsearch from 'elasticsearch';

export function getElasticSearchClient() {
    const client = new elasticsearch.Client({
        host: 'localhost:9200',
        log: 'trace',
    });
    return client;
}

export const elasticSearchBrazilianAnalyzer = {
    analysis: {
        filter: {
            brazilian_stop: {
                type: 'stop',
                stopwords: '_brazilian_',
            },
            brazilian_stemmer: {
                type: 'stemmer',
                language: 'brazilian',
            }
        },
        analyzer: {
            rebuilt_brazilian: {
                tokenizer: 'standard',
                filter: [
                    'lowercase',
                    'brazilian_stop',
                    'brazilian_keywords',
                    'brazilian_stemmer'
                ],
            }
        }
    },
};
