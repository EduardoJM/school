import 'reflect-metadata';
import dotenv from 'dotenv';
import createConnection from '../../src/connection';
import { User, Admin } from '../../src/components/peoples/PeoplesEntities';
import { getRepository } from 'typeorm';

console.log('CREATING CONNECTION');

createConnection().then(async (connection) => {
    if (!connection) {
        console.log('FAILED TO CREATE CONNECTION');
        return;
    }
    dotenv.config();

    const userRepo = getRepository(User);
    const adminRepo = getRepository(Admin);
    
    const user = new User();
    user.fullName = 'Admin';
    user.password = 'admin';
    user.hashPassword();
    user.email = 'admin@admin.com.br';
    
    const result = await userRepo.save(user);

    const admin = new Admin();
    admin.user = result;

    await adminRepo.save(admin);

    await connection.close();
});
