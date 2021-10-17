import { ElasticSearchQueryBuilder } from './elasticsearch';

describe('ElasticSearchQueryBuilder', () => {
    it('The static begin() method must be return a new instance of ElasticSearchQueryBuilder', () => {
        const builder = ElasticSearchQueryBuilder.begin();
        
        expect(builder).not.toBe(null);
        expect(builder).not.toBe(undefined);
    });

    it('The getBody() method must be return a empty object if none query or filter is applied', () => {
        const builder = ElasticSearchQueryBuilder.begin();

        expect(typeof builder.getBody()).toBe('object');
        expect(builder.getBody()).toMatchObject({});
    });

    it('When apply a query match, the getBody() must be return a valid elasticsearch query object', () => {
        const query = ElasticSearchQueryBuilder
            .begin()
            .query.match('name', 'Search')
            .getBody();
        
        expect(typeof query).toBe('object');
        expect(query).toMatchObject({
            query: {
                match: {
                    name: 'Search',
                },
            },
        });
    });

    it('When apply a query fuzzinessAnd, the getBody() must be return a valid elasticsearch query object', () => {
        const query = ElasticSearchQueryBuilder
            .begin()
            .query.fuzzinessAnd('name', 'Search')
            .getBody();
        
        expect(typeof query).toBe('object');
        expect(query).toMatchObject({
            query: {
                match: {
                    name: {
                        query: 'Search',
                        operator: 'and',
                        fuzziness: 2,
                    },
                },
            },
        });
    });

    it('When apply a query fuzzinessAnd and a match, the getBody() must be return a valid elasticsearch query object', () => {
        const query = ElasticSearchQueryBuilder
            .begin()
            .query.fuzzinessAnd('name', 'Search')
            .query.match('active', true)
            .getBody();
        
        expect(typeof query).toBe('object');
        expect(query).toMatchObject({
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                name: {
                                    query: 'Search',
                                    operator: 'and',
                                    fuzziness: 2,
                                },
                            },
                        },
                        {
                            match: { active: true },
                        }
                    ],
                },
            },
        });
    });

    it('When apply two or more query match, the getBody() must be return a valid elasticsearch query method', () => {
        let query = ElasticSearchQueryBuilder
            .begin()
            .query.match('name', 'Search')
            .query.match('active', true)
            .getBody();
        
        expect(typeof query).toBe('object');
        expect(query).toMatchObject({
            query: {
                bool: {
                    must: [
                        { match: { name: 'Search' } },
                        { match: { active: true } },
                    ],
                },
            },
        });

        query = ElasticSearchQueryBuilder
            .begin()
            .query.match('name', 'Search')
            .query.match('active', true)
            .query.match('age', 42)
            .getBody();
        
        expect(typeof query).toBe('object');
        expect(query).toMatchObject({
            query: {
                bool: {
                    must: [
                        { match: { name: 'Search' } },
                        { match: { active: true } },
                        { match: { age: 42 } },
                    ],
                },
            },
        });
    });

    it('When apply a query fuzzinessAnd and a filter, the getBody() must be return a valid elasticsearch query object', () => {
        const query = ElasticSearchQueryBuilder
            .begin()
            .query.fuzzinessAnd('name', 'Search')
            .filter.term('active', true)
            .getBody();
        
        expect(typeof query).toBe('object');
        expect(query).toMatchObject({
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                name: {
                                    query: 'Search',
                                    operator: 'and',
                                    fuzziness: 2,
                                },
                            },
                        },
                    ],
                    filter: { term: { active: true } },
                },
            },
        });
    });

    it('When apply two or more filter, the getBody() must be return a valid elasticsearch query object', () => {
        const query = ElasticSearchQueryBuilder
            .begin()
            .filter.term('active', true)
            .filter.term('age', 42)
            .getBody();
        
        expect(typeof query).toBe('object');
        expect(query).toMatchObject({
            query: {
                bool: {
                    filter: {
                        bool: {
                            must: [
                                { term: { active: true } },
                                { term: { age: 42 } },
                            ],
                        },
                    },
                },
            },
        });
    });
});
