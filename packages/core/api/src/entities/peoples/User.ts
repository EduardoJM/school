import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { Student } from './Student';
import { Admin } from './Admin';
import { getGravatarImageUrl } from '../../integrations/gravatar';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 180,
        nullable: false,
    })
    fullName!: string;

    @Column({
        length: 80,
        nullable: true,
    })
    displayName!: string;

    @Column({
        length: 100,
        nullable: false,
        unique: true,
    })
    email!: string;

    @Column({
        length: 100,
        nullable: true,
    })
    password!: string;

    @Column({
        default: true,
    })
    useGravatar!: boolean;

    @Column({
        length: 250,
    })
    avatar!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToOne(() => Student, (student) => student.user)
    student!: Student;

    @OneToOne(() => Admin, (admin) => admin.user)
    admin!: Admin;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }

    serialize(id: boolean = true): Record<string, any> {
        const initialData: Record<string, any> = {};
        if (id) {
            initialData['id'] = this.id;
        }
        if (this.useGravatar) {
            initialData['avatar'] = getGravatarImageUrl(this.email);
        } else {
            // TODO: add domain here...
            initialData['avatar'] = this.avatar;
        }
        return {
            fullName: this.fullName,
            displayName: this.displayName,
            email: this.email,
            // TODO: add domain here...
            rawAvatar: this.avatar,
            useGravatar: this.useGravatar,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            ...initialData,
        };
    }

    static create(data: Record<string, any>): User {
        let user = new User();
        try {
            user = Object.assign(user, data);
            if (Object.prototype.hasOwnProperty.call(data, 'password')) {
                user.hashPassword();
            }
        } catch {}
        return user;
    }
}
