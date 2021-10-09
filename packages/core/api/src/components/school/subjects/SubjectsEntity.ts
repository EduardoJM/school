import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Tag } from '../tags/TagsEntity';
import { buildUrl } from '../../../utils/urls';

@Entity()
export class Subject {
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

    serialize(): Record<string, any> {
        return {
            id: this.id,
            name: this.name,
            icon: (!this.icon || this.icon === '') ? '' : buildUrl(`icons/subjects/${this.icon}`),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            active: this.active,
        };
    }
}
