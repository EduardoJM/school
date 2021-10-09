declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SERVER_PORT?: string;
            ITENS_PER_PAGE?: string;
            ELASTIC_SEARCH_HOST?: string;
            ELASTIC_SEARCH_PORT?: string;
            SQL_HOST?: string;
            SQL_PORT?: string;
            SQL_USER?: string;
            SQL_PASSWORD?: string;
            SQL_DATABASE?: string;
            JWT_SECRET?: string;
        }
    }
}

export {};
