import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { Student } from '../student/StudentEntity';
import { Admin } from '../admin/AdminEntity';
import { getGravatarImageUrl, checkIfGravatarExists } from '../../../integrations/gravatar';

export type UserType = 'UNKNOWN' | 'ADMIN' | 'STUDENT' | 'TEACHER';

export interface UserCreateInformation {
    fullName: string;
    displayName?: string;
    email: string;
    password?: string;
    useGravatar?: boolean;
    avatar?: boolean;
}

export type UserUpdateInformation = Partial<UserCreateInformation>;

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
        nullable: true,
        default: '',
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

    async getAvatar(): Promise<string | null> {
        if (this.useGravatar) {
            const hasGravatar = await checkIfGravatarExists(this.email);
            if (hasGravatar) {
                return getGravatarImageUrl(this.email);
            }
        }
        if (this.avatar === undefined) {
            return null;
        }
        return this.avatar;
    }

    isAdmin(): boolean {
        return !!this.admin;
    }

    isStudent(): boolean {
        return !!this.student;
    }

    getUserType(): UserType {
        if (this.isAdmin()) {
            return 'ADMIN';
        } else if (this.isStudent()) {
            return 'STUDENT';
        }
        return 'UNKNOWN';
    }

    async serialize(): Promise<Record<string, any>> {
        const type = this.getUserType();
        let childData: Record<string, any> = {};
        if (type == 'ADMIN') {
            childData = await this.admin.serializeChild();
        } else if (type == 'STUDENT') {
            childData = await this.student.serializeChild();
        }
        const data = {
            id: this.id,
            type: type,
            fullName: this.fullName,
            displayName: this.displayName,
            email: this.email,
            avatar: await this.getAvatar(),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            ...childData
        };
        return data;
    };

    update(data: UserUpdateInformation): void {
        Object.assign(this, data);
        if (data.password) {
            this.hashPassword();
        }
    }

    static create(data: UserCreateInformation): User {
        const user = new User();
        user.update(data);
        return user;
    }
}
