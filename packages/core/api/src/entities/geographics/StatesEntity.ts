import {
    Entity,
    Column,
    PrimaryColumn,
    OneToMany,
} from 'typeorm';
import { City } from './CitiesEntity';

@Entity()
export class State {
    @PrimaryColumn()
    code!: number;
    
    @Column({
        nullable: false,
    })
    uf!: string;

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

    @OneToMany(() => City, (city) => city.state)
    cities!: City[];
}
