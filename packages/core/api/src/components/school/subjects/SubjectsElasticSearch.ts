import { defaults, getElasticSearchClient } from '../../../configs';
import { User } from '../../peoples/PeoplesEntities';
import { Subject } from './SubjectsEntity';

export const SubjectsElasticSearch = {
    async updateIndexes(subject: Subject) {
        const esClient = getElasticSearchClient();
        return esClient.index({
            index: 'subjects',
            type: '_doc',
            id: String(subject.id),
            body: subject,
        });
    },
    async deleteIndexes(id: string) {
        const esClient = getElasticSearchClient();
        try {
            await esClient.delete({
                index: 'subjects',
                type: '_doc',
                id: String(id),
            });
        } catch (err) {}
    },
    async search(search: string, page: number, user?: User) {
        const itensPerPage = Number(process.env.ITENS_PER_PAGE || defaults.itensPerPage);
        let body: any = {};
        if (search) {
            if (user && user.getUserType() === 'STUDENT') {
                body = {
                    query: {
                        bool: {
                            must: {
                                match: {
                                    name: {
                                        query: search,
                                        operator: 'and',
                                        fuzziness: 2,
                                    },
                                },
                            },
                            filter: {
                                term: { active: true },
                            },
                        },
                    },
                };
            } else {
                body = {
                    query: {
                        match: {
                            name: {
                                query: search,
                                operator: 'and',
                                fuzziness: 2,
                            },
                        },
                    },
                };
            }
        } else if (user && user.getUserType() === 'STUDENT') {
            body = {
                query: {
                    match: {
                        active: true,
                    },
                },
            };
        }
        const esClient = getElasticSearchClient();
        const result = await esClient.search({
            index: 'subjects',
            size: itensPerPage,
            body
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
