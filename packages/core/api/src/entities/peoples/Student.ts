import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './User';

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
        if (!this.user) {
            return {
                id: this.id,
                type: 'STUDENT',
            };
        } else {
            return {
                id: this.id,
                type: 'STUDENT',
                ...(await this.user.serialize(false)),
            }
        }
    };
}
