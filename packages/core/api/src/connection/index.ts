import { Connection, createConnection } from 'typeorm';
import { Admin, Entities, User } from '../components/Entities';
import { defaults } from '../configs';

export default async function newConnection(): Promise<Connection | null> {
    let conn: Connection | null = null;
    if (process.env.NODE_ENV === 'test') {
        conn = await createConnection({
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            entities: Entities,
            synchronize: true,
            logging: false,
        });
        const userRepository = conn.getRepository(User);
        const adminRepository = conn.getRepository(Admin);
        let user = new User();
        user.email = 'example@example.com';
        user.fullName = 'Example';
        user = await userRepository.save(user);
        const admin = new Admin();
        admin.user = user;
        await adminRepository.save(admin);
    } else {
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
    }
    return conn;
}
