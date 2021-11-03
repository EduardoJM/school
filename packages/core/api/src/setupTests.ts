import { createConnection, getConnection } from 'typeorm';
import { Entities } from './entities';

beforeAll(async () => {
    return createConnection({
        type: "sqlite",
        database: ":memory:",
        name: 'default',
        dropSchema: true,
        entities: Entities,
        synchronize: true,
        logging: false
    });
});

afterAll(async () => {
    let conn = getConnection();
    return conn.close();
});
