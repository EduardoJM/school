import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './User';

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

    serialize(): Record<string, any> {
        if (!this.user) {
            return {
                id: this.id,
                type: 'ADMIN',
            };
        } else {
            return {
                id: this.id,
                type: 'ADMIN',
                ...this.user.serialize(false),
            }
        }
    };
}
