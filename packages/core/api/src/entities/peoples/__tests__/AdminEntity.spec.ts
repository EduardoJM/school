import { User } from '../UserEntity';
import { Admin } from '../AdminEntity';

describe('Admin Entity', () => {
    it('The serialize must be return a type and the parent user properties', async () => {
        const user = User.create({ email: 'email@email.com', fullName: 'Email', useGravatar: false });
        const admin = new Admin();
        admin.user = user;
        user.admin = admin;

        const data1 = await user.serialize();
        const data2 = await admin.serialize();
        expect(data1).toHaveProperty('type');
        expect(data1.type).toBe('ADMIN');
        expect(data1).toMatchObject(data2);
    });
});
