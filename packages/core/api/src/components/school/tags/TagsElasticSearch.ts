import { defaults, getElasticSearchClient } from '../../../configs';
import { User } from '../../peoples/PeoplesEntities';
import { Tag } from './TagsEntity';
import { ElasticSearchQueryBuilder } from '../../../utils/elasticsearch';

export const TagsElasticSearch = {
    async updateIndexes(tag: Tag) {
        const esClient = getElasticSearchClient();
        return esClient.index({
            index: 'tags',
            type: '_doc',
            id: String(tag.id),
            body: {
                ...tag,
                subject: tag.subject.id,
            },
        });
    },
    async deleteIndexes(id: string) {
        const esClient = getElasticSearchClient();
        try {
            await esClient.delete({
                index: 'tags',
                type: '_doc',
                id: String(id),
            });
        } catch (err) {}
    },
    async search(search: string, page: number, subjectId: number, user?: User) {
        const itensPerPage = Number(process.env.ITENS_PER_PAGE || defaults.itensPerPage);
        //let body: any = undefined;
        let sort: any = undefined;
        if (!search) {
            sort = ['id:desc'];
        }
        /*
        const match = {
            name: {
                query: search,
                operator: 'and',
                fuzziness: 2,
            },
        };
        */
        const queryBuilder = ElasticSearchQueryBuilder.begin();
        if (search) {
            queryBuilder.query.fuzzinessAnd('name', search);
        }
        if (user && user.getUserType() === 'STUDENT') {
            queryBuilder.filter.term('active', true);
        }
        if (subjectId > 0) {
            queryBuilder.filter.term('subject', subjectId);
        }
        const body = queryBuilder.getBody();
        console.log(JSON.stringify(body));

        /*
        if (search) {
            if (user && user.getUserType() === 'STUDENT') {
                if (subjectId > 0) {
                    body = {
                        query: {
                            bool: {
                                must: [
                                    { match }
                                ],
                                filter: {
                                    bool: {
                                        must: [
                                            { term: { active: true } },
                                            { term: { subject: subjectId } },
                                        ]
                                    }
                                },
                            },
                        },
                    };
                } else {
                    body = {
                        query: {
                            bool: {
                                must: [
                                    { match }
                                ],
                                filter: {
                                    term: {
                                        active: true,
                                    },
                                },
                            },
                        },
                    };
                }
            } else {
                if (subjectId > 0) {
                    body = {
                        query: {
                            bool: {
                                must: [{ match }],
                                filter: {
                                    term: {
                                        subject: subjectId
                                    }
                                }
                            },
                        },
                    };
                } else {
                    body = { query: { match } };
                }
            }
        } else if (user && user.getUserType() === 'STUDENT') {
            if (subjectId > 0) {
                body = {
                    query: {
                        bool: {
                            must: [
                                {
                                    match: {
                                        active: true,
                                    },
                                }
                            ],
                            filter: {
                                term: {
                                    subject: subjectId
                                }
                            }
                        }
                    },
                };
            } else {
                body = {
                    query: {
                        match: {
                            active: true,
                        },
                    },
                };
            }
            sort = ['id:desc'];
        } else {
            sort = ['id:desc'];
        }
        */
        const esClient = getElasticSearchClient();
        const result = await esClient.search({
            index: 'tags',
            size: itensPerPage,
            body,
            sort,
        });

        const count = Number((result.hits.total as any).value);

        return {
            results: result.hits.hits.map((item) => {
                const score = item._score;
                return { ...(item._source as any), score };
            }),
            count,
            pages: Math.ceil(count / itensPerPage),
        };
    }
};
