export class ElasticSearchQueryBuilder {
    private object: any = {};

    public query = {
        fuzzinessAnd: (field: string, search: string, fuzziness: number = 2) => {
            const match = {
                [field]: {
                    query: search,
                    operator: 'and',
                    fuzziness,
                },
            };
            this.appendQueryMatch(match);
            return this;
        },
        match: (field: string, value: any) => {
            const match = {
                [field]: value,
            };
            this.appendQueryMatch(match);
            return this;
        },
    };

    public filter = {
        term: (field: string, value: any) => {
            const term = {
                [field]: value,
            };
            this.appendFilter(term);
            return this;
        },
    };

    public static begin(): ElasticSearchQueryBuilder {
        return new ElasticSearchQueryBuilder();
    }

    public getBody(): any {
        if (this.object.filter) {
            return {
                query: {
                    bool: {
                        must: [
                            ...(this.object.query ? [this.object.query] : []),
                        ],
                        filter: this.object.filter,
                    }
                }
            }
        }
        return this.object;
    }

    private appendFilter(term: any) {
        if (!Object.prototype.hasOwnProperty.call(this.object, 'filter') ||
            !Object.prototype.hasOwnProperty.call(this.object.filter, 'term')) {
            this.object.filter = { term };
        } else {
            let filter = this.object.filter;
            if (Object.prototype.hasOwnProperty.call(filter, 'term')) {
                const otherTerm = filter['term'];
                delete filter.term;
                filter = {
                    ...filter,
                    bool: {
                        must: [ { term: otherTerm }, { term } ],
                    },
                };
            }
            this.object.filter = filter;
        }
    }

    private appendQueryMatch(match: any) {
        if (!Object.prototype.hasOwnProperty.call(this.object, 'query')) {
            this.object.query = { match };
        } else {
            let query = this.object.query;
            if (Object.prototype.hasOwnProperty.call(query, 'match')) {
                const otherMatch = query['match'];
                delete query.match;
                query = {
                    ...query,
                    bool: {
                        must: [ { match: otherMatch }, { match } ],
                    },
                };
            } else {
                let appended = false;
                if (Object.prototype.hasOwnProperty.call(query, 'bool')) {
                    if (Object.prototype.hasOwnProperty.call(query.bool, 'must')) {
                        appended = true;
                        query.bool.must = [
                            ...query.bool.must,
                            { match },
                        ];
                    }
                }
                if (!appended) {
                    query = { ...query, match };
                }
            }
            this.object.query = query;
        }
    }
}
