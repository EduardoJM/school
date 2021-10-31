import request from 'supertest';
import { getConnection, getRepository } from 'typeorm';
import path from 'path';
import { User } from '../../user/UserEntity';
import { Student } from '../StudentEntity';
import { app } from '../../../../app';
import createConnection from '../../../../connection';
import { removeFileIfExists } from '../../../../utils/files';

describe('Student Controller', () => {
    beforeAll(async () => {
        const conn = await createConnection();
        if (!conn) {
            return;
        }
    });

    afterAll(async () => {
        const userRepo = getRepository(User);
        const studentRepo = getRepository(Student);
        const users = await userRepo.find();
        users.forEach((item) => {
            removeFileIfExists(
                path.resolve(__dirname, '..', '..', '..', '..', '..', 'media', 'images', 'avatars', item.avatar)
            );
        });
        await studentRepo.delete({});
        await userRepo.delete({});
        const conn = getConnection();
        conn.close();
    });
    
    it('Should be create a new student passing fullName, email and password', async () => {
        const fullName = 'Arthur Dent';
        const email = 'arthur@dent.com.br';
        const password = 'arthur_12345';

        const response = await request(app)
            .post('/peoples/students')
            .send({ fullName, email, password });
        
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        
        const id = Number(response.body.id);
        const userRepo = getRepository(User);
        const user = await userRepo.findOne({ id });

        expect(user).not.toBeNull();
        expect(user?.id).toBe(id);
        expect(user?.fullName).toBe(fullName);
        expect(user?.email).toBe(email);
        expect(user?.checkIfUnencryptedPasswordIsValid(password)).toBe(true);
    });

    it('Should be create a new student passing fullName, email, password, displayName, useGravatar and avatar', async () => {
        const fullName = 'Ford Prefect';
        const email = 'ford@prefect.com.br';
        const password = 'prefect_12345';
        const displayName = 'Ford';
        const useGravatar = false;

        const response = await request(app)
            .post('/peoples/students')
            .field('fullName', fullName)
            .field('email', email)
            .field('password', password)
            .field('displayName', displayName)
            .field('useGravatar', useGravatar)
            .attach('avatar', './__tests__/mock/files/sample-avatar.png');
        
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        
        const id = Number(response.body.id);
        const userRepo = getRepository(User);
        const user = await userRepo.findOne({ id });

        expect(user).not.toBeNull();
        expect(user?.id).toBe(id);
        expect(user?.fullName).toBe(fullName);
        expect(user?.email).toBe(email);
        expect(user?.checkIfUnencryptedPasswordIsValid(password)).toBe(true);
        expect(user?.displayName).toBe(displayName);
        expect(user?.useGravatar).toBe(useGravatar);
        expect(user?.avatar).not.toBeUndefined();
    });
});
