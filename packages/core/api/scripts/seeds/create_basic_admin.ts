import 'reflect-metadata';
import dotenv from 'dotenv';
import { getConnection } from 'typeorm';
import { User, Admin } from '../../src/entities';
import '../../src/database';

async function make() {
    dotenv.config();

    try {
        const conn = getConnection();

        const userRepo = conn.getRepository(User);
        const adminRepo = conn.getRepository(Admin);
        
        const user = new User();
        user.fullName = 'Admin';
        user.password = 'admin';
        user.hashPassword();
        user.email = 'admin@admin.com.br';
        
        const result = await userRepo.save(user);
    
        const admin = new Admin();
        admin.user = result;
    
        await adminRepo.save(admin);
    } catch(error) {
        console.log(JSON.stringify(error));
        setTimeout(make, 1000);
    }
}
setTimeout(make, 1000);
