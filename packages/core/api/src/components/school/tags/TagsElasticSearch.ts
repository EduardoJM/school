import { defaults, getElasticSearchClient } from '../../../configs';
import { User } from '../../peoples/PeoplesEntities';
import { Tag } from './TagsEntity';

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
    async search(search: string, page: number, user?: User) {
        const itensPerPage = Number(process.env.ITENS_PER_PAGE || defaults.itensPerPage);
        let body: any = undefined;
        let sort: any = undefined;
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
                                term: {
                                    active: true,
                                },
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
            sort = ['id:desc'];
        } else {
            sort = ['id:desc'];
        }
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
