import 'reflect-metadata';
import dotenv from 'dotenv';
import { states } from './data/states';
import { cities } from './data/cities';
import { City, State } from '../../src/entities';
import { getConnection } from 'typeorm';
import '../../src/database';


async function make() {
    dotenv.config();

    try {
        const conn = getConnection();

        const stateRepo = conn.getRepository(State);
        const cityRepo = conn.getRepository(City);

        async function createState(props: { code: number, uf: string, name: string, lat: number, long: number }): Promise<State> {
            const state = new State();
            state.code = props.code;
            state.uf = props.uf;
            state.name = props.name;
            state.lat = props.lat;
            state.long = props.long;
            const result = await stateRepo.save(state);
            return result;
        };

        async function createCity(props: { code: number, name: string, lat: number, long: number, state: number }, state: State): Promise<City> {
            const city = new City();
            city.code = props.code;
            city.name = props.name;
            city.lat = props.lat;
            city.long = props.long;
            city.state = state;
            const result = await cityRepo.save(city);
            return result;
        }

        const codeState: {
            [key: number]: State;
        } = {};
        for (let i = 0; i < states.length; i += 1) {
            console.log(`Saving state ${i} of ${states.length}`);
            const item = await createState(states[i]);
            codeState[item.code] = item;
        }
        for (let i = 0; i < cities.length; i += 1) {
            console.log(`Saving city ${i} of ${cities.length}`);
            const city = cities[i];
            const state = codeState[city.state];
            await createCity(city, state);
        }
    } catch(error) {
        console.log(JSON.stringify(error));
        setTimeout(make, 1000);
    }
}
setTimeout(make, 1000);
