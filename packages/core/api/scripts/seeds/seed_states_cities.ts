import 'reflect-metadata';
import dotenv from 'dotenv';
import { states } from './data/states';
import { cities } from './data/cities';

import createConnection from '../../src/connection';
import { City, State } from '../../src/components/Entities';
import { getRepository } from 'typeorm';

console.log('CREATING CONNECTION');

createConnection().then(async (connection) => {
    if (!connection) {
        console.log('FAILED TO CREATE CONNECTION');
        return;
    }
    dotenv.config();
    
    const stateRepo = getRepository(State);
    const cityRepo = getRepository(City);
    
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

    await connection.close();
});
