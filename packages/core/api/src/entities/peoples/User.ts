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
import { getGravatarImageUrl, checkIfGravatarExists } from '../../integrations/gravatar';

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

    isAdmin(): boolean {
        return !!this.admin;
    }

    isStudent(): boolean {
        return !!this.student;
    }

    async serializeChild(): Promise<Record<string, any>> {
        if (this.student) {
            return this.student.serialize();
        }
        if (this.admin) {
            return this.admin.serialize();
        }
        return this.serialize(true);
    }

    async getAvatar(): Promise<string | null> {
        if (!this.useGravatar) {
            // TODO: build domain here
            return this.avatar;
        }
        const hasGravatar = await checkIfGravatarExists(this.email);
        if (hasGravatar) {
            return getGravatarImageUrl(this.email);
        }
        return null;
    }

    async serialize(id: boolean = true): Promise<Record<string, any>> {
        const initialData: Record<string, any> = {};
        if (id) {
            initialData['id'] = this.id;
        }
        return {
            fullName: this.fullName,
            displayName: this.displayName,
            email: this.email,
            avatar: await this.getAvatar(),
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
