import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './UserEntity';

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @OneToOne(() => User, (user) => user.admin, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn()
    user!: User;

    async serialize(): Promise<Record<string, any>> {
        return this.user.serialize();
    }

    async serializeChild(): Promise<Record<string, any>> {
        return {};
    }
}
