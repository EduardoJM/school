import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import Subject from './Subject';

@Entity()
export default class Tag {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 120,
        nullable: false,
        unique: true,
    })
    name!: string;

    @ManyToOne(() => Subject, (subject) => subject.tags)
    subject!: Subject;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @Column()
    active!: boolean;

    @ManyToOne(() => Tag, (tag) => tag.children)
    parent!: Tag;

    @OneToMany(() => Tag, (tag) => tag.parent)
    children!: Tag[];
}
