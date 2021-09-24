import { Connection, createConnection } from 'typeorm';
import { Entities } from '../entities';
import { defaults } from '../configs';

export default async function newConnection(): Promise<Connection | null> {
    let conn: Connection | null = null;
    try {
        conn = await createConnection({
            type: 'mysql',
            host: process.env.SQL_HOST || defaults.sqlHost,
            port: Number(process.env.SQL_PORT) || defaults.sqlPort,
            username: process.env.SQL_USER || defaults.sqlUser,
            password: process.env.SQL_PASSWORD || defaults.sqlPassword,
            database: process.env.SQL_DATABASE || defaults.sqlDatabase,
            entities: Entities,
            synchronize: true,
            logging: false,
        });
    } catch (error) {
        console.log(error);
        console.log(JSON.stringify(error, null, 4));
        conn = null;
    }
    return conn;
}
