import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './UserEntity';

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @OneToOne(() => User, (user) => user.student, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn()
    user!: User;

    async serialize(): Promise<Record<string, any>> {
        this.user.student = this;
        return this.user.serialize();
    }

    async serializeChild(): Promise<Record<string, any>> {
        return {};
    }
}
