import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PolymorphicParent } from 'typeorm-polymorphic';
import { PolymorphicChildInterface } from 'typeorm-polymorphic/dist/polymorphic.interface';
import { User } from '../user/UserEntity';

@Entity()
export class Student implements PolymorphicChildInterface {
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
            type: 'STUDENT',
            ...(await this.owner.serialize(false)),
        }
    };
}
