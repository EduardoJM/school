import { defaults } from '../../../configs';
import { getElasticSearchClient } from '../../../integrations';
import { User, Subject } from '../../../entities';
import { ElasticSearchQueryBuilder } from '../../../utils/elasticsearch';

export const SubjectsElasticSearch = {
    async updateIndexes(subject: Subject) {
        const esClient = getElasticSearchClient();
        return esClient.index({
            index: 'subjects',
            type: '_doc',
            id: String(subject.id),
            body: subject.serialize(),
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
        let sort: any = undefined;

        if (!search) {
            sort = ['id:desc'];
        }

        const queryBuilder = ElasticSearchQueryBuilder.begin();
        if (search) {
            queryBuilder.query.fuzzinessAnd('name', search);
        }
        if (user && user.getUserType() === 'STUDENT') {
            queryBuilder.filter.term('active', true);
        }
        const body = queryBuilder.getBody();

        const esClient = getElasticSearchClient();
        const result = await esClient.search({
            index: 'subjects',
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
