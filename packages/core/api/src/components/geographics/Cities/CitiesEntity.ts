import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
} from 'typeorm';
import { State } from '../States/StatesEntity';

@Entity()
export class City {
    @PrimaryColumn()
    code!: number;
    
    @Column({
        nullable: false,
    })
    name!: string;

    @Column({
        type: 'float',
        precision: 8,
        nullable: false,
    })
    lat!: number;

    @Column({
        type: 'float',
        precision: 8,
        nullable: false,
    })
    long!: number;

    @ManyToOne(() => State, (state) => state.cities)
    state!: State;
}
