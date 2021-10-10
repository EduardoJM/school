import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Subject } from '../subjects/SubjectsEntity';

@Entity()
export class Tag {
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

    getHierarchicalActive() {
        if (!this.active || !this.subject || !this.subject.active) {
            return false;
        }
        return this.active;
    }
}
