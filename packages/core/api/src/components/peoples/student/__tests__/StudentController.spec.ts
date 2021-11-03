import request from 'supertest';
import { getConnection, getCustomRepository, getRepository, QueryRunner } from 'typeorm';
import path from 'path';
import { User, Student } from '../../../../entities';
import { app } from '../../../../app';
import { removeFileIfExists } from '../../../../utils/files';
import { UserRepository } from '../../user/UserRepository';

describe('Student Controller', () => {
    afterAll(async () => {
        const userRepo = getCustomRepository(UserRepository);
        const studentRepo = getRepository(Student);
        const users = await userRepo.find();
        users.forEach((item) => {
            removeFileIfExists(
                path.resolve(__dirname, '..', '..', '..', '..', '..', 'media', 'images', 'avatars', item.avatar)
            );
        });
        await studentRepo.delete({});
        await userRepo.delete({});
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

        expect(user).not.toBeUndefined();
        expect(user).not.toBeNull();
        expect(user?.id).toBe(id);
        expect(user?.fullName).toBe(fullName);
        expect(user?.email).toBe(email);
        expect(user?.checkIfUnencryptedPasswordIsValid(password)).toBe(true);
        expect(user?.displayName).toBe(displayName);
        expect(user?.useGravatar).toBe(useGravatar);
        expect(user?.avatar).not.toBeUndefined();
    });
    
    it('Should be return 409 if email is already used', async () => {
        const fullName = 'Arthur Dent';
        const email = 'arthur.dent@email.com.br';
        const password = 'arthur_12345';

        await request(app)
            .post('/peoples/students')
            .send({ fullName, email, password });
        
        const response = await request(app)
            .post('/peoples/students')
            .send({ fullName, email, password });

        expect(response.statusCode).toBe(409);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('error');
    });
});
