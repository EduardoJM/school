import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id!: number;

    
}
