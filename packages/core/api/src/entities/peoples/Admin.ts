import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { PolymorphicParent } from 'typeorm-polymorphic';
import { PolymorphicChildInterface } from 'typeorm-polymorphic/dist/polymorphic.interface';
import { User } from './User';

@Entity()
export class Admin implements PolymorphicChildInterface {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @PolymorphicParent(() => User)
    owner!: User;

    @Column()
    entityId!: number;

    @Column()
    entityType!: string;

    async serialize(): Promise<Record<string, any>> {
        return {
            type: 'ADMIN',
            ...(await this.owner.serialize(false)),
        }
    };
}
