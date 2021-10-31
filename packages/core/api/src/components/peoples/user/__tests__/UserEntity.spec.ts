import { User } from '../UserEntity';
import { Admin } from '../../admin/AdminEntity';
import { Student } from '../../student/StudentEntity';

describe('User Entity', () => {
    it('Create a new user using static method must be set the informations', () => {
        const email = 'user@user.com.br'
        const fullName = 'The User';
        const displayName = 'User';
        const avatar = 'avatar_file';
        const useGravatar = false;
        const user = User.create({ email, fullName, displayName, avatar, useGravatar });
       
        expect(user.email).toBe(email);
        expect(user.fullName).toBe(fullName);
        expect(user.displayName).toBe(displayName);
        expect(user.avatar).toBe(avatar);
        expect(user.useGravatar).toBe(useGravatar);
    });

    it('Create a new user using static method setting the password must be encrypt the password', () => {
        const email = 'user@user.com.br'
        const fullName = 'The User';
        const password = '123456';
        const user = User.create({ email, fullName, password });

        expect(user.password).not.toBeUndefined();
        expect(typeof user.password).toBe('string');
        expect(user.password).not.toBeNull();
        expect(user.password).not.toBe(password);
    });

    it('The update method must be set the informations', () => {
        const email = 'user@user.com.br'
        const fullName = 'The User';
        const displayName = 'User';
        const avatar = 'avatar_file';
        const useGravatar = false;
        const user = new User();

        user.update({ email, fullName, displayName, avatar, useGravatar });
        expect(user.email).toBe(email);
        expect(user.fullName).toBe(fullName);
        expect(user.displayName).toBe(displayName);
        expect(user.avatar).toBe(avatar);
        expect(user.useGravatar).toBe(useGravatar);
    });

    it('The update method setting the password must be encrypt the password', () => {
        const email = 'user@user.com.br'
        const fullName = 'The User';
        const password = '123456';
        const user = new User();
        
        user.update({ email, fullName, password });

        expect(user.password).not.toBeUndefined();
        expect(typeof user.password).toBe('string');
        expect(user.password).not.toBeNull();
        expect(user.password).not.toBe(password);
    });

    it('The hashPassword must be change the password', () => {
        const password = '123456';
        const user = new User();
        
        user.password = password;
        user.hashPassword();

        expect(user.password).not.toBeUndefined();
        expect(typeof user.password).toBe('string');
        expect(user.password).not.toBeNull();
        expect(user.password).not.toBe(password);
    });

    it('The checkIfUnencryptedPasswordIsValid must be validate the password', () => {
        const password = '123456';
        const user = new User();
        
        user.password = password;
        user.hashPassword();

        expect(user.password).not.toBeUndefined();
        expect(typeof user.password).toBe('string');
        expect(user.password).not.toBeNull();
        expect(user.password).not.toBe(password);
        expect(user.checkIfUnencryptedPasswordIsValid(password)).toBe(true);
    });

    it('The getAvatar must be return null if the avatar is not set and useGravatar is false', async () => {
        const email = 'user@user.com.br'
        const fullName = 'The User';
        const useGravatar = false;

        const user = User.create({ email, fullName, useGravatar });
        const avatar = await user.getAvatar();
        
        expect(avatar).toBeNull();
    });

    it('The getAvatar must be return the avatar if the avatar is set and useGravatar is false', async () => {
        const email = 'user@user.com.br'
        const fullName = 'The User';
        const useGravatar = false;
        const avatar = 'avatar_file';

        const user = User.create({ email, fullName, avatar, useGravatar });
        const avatarResult = await user.getAvatar();
        
        expect(avatarResult).toBe(avatar);
    });

    it('The getAvatar must be return a gravatar url if the useGravatar is true and user has gravatar account', async () => {
        const email = 'eduardo_y05@outlook.com'
        const fullName = 'The User';
        const useGravatar = true;

        const user = User.create({ email, fullName, useGravatar });
        const avatar = await user.getAvatar();
        
        expect(avatar).not.toBeUndefined();
        expect(avatar).not.toBeNull();
        expect(avatar).toMatch(/gravatar.com/i);
    });

    it('The getAvatar must be return default avatar if the useGravatar is true and user has no gravatar account', async () => {
        const email = 'example_example_example@example.com.br'
        const fullName = 'The User';
        const useGravatar = true;

        const user = User.create({ email, fullName, useGravatar });
        const avatar = await user.getAvatar();
        
        expect(avatar).toBeNull();
    });

    it('The serialize method must be return the user type', async () => {
        const user1 = User.create({ email: 'aa@email.com', fullName: 'aaa', useGravatar: false });
        const user2 = User.create({ email: 'aa@email.com', fullName: 'aaa', useGravatar: false });
        const user3 = User.create({ email: 'aa@email.com', fullName: 'aaa', useGravatar: false });

        const admin = new Admin();
        user1.admin = admin;

        const student = new Student();
        user2.student = student;

        const data1 = await user1.serialize();
        const data2 = await user2.serialize();
        const data3 = await user3.serialize();

        expect(data1).toHaveProperty('type');
        expect(data2).toHaveProperty('type');
        expect(data3).toHaveProperty('type');
        expect(data1.type).toBe('ADMIN');
        expect(data2.type).toBe('STUDENT');
        expect(data3.type).toBe('UNKNOWN');
    });
});
