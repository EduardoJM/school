import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import Tag from './Tag';

@Entity()
export default class Subject {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 120,
        nullable: false,
        unique: true,
    })
    name!: string;

    @Column({
        length: 150,
        nullable: true
    })
    icon!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @Column()
    active!: boolean;

    @OneToMany(() => Tag, (tag) => tag.subject)
    tags!: Tag[];
}
