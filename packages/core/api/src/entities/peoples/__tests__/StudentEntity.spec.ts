import { User } from '../UserEntity';
import { Student } from '../StudentEntity';

describe('Student Entity', () => {
    it('The serialize must be return a type and the parent user properties', async () => {
        const user = User.create({ email: 'email@email.com', fullName: 'Email', useGravatar: false });
        const student = new Student();
        student.user = user;
        user.student = student;

        const data1 = await user.serialize();
        const data2 = await student.serialize();
        expect(data1).toHaveProperty('type');
        expect(data1.type).toBe('STUDENT');
        expect(data1).toMatchObject(data2);
    });
});
