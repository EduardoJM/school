import request from 'supertest';
import { getConnection } from 'typeorm';
import createConnection from '../../../connection';
import { State } from './StatesEntity';
import { City } from '../Cities/CitiesEntity';
import { app } from '../../../app';
import { generateToken } from '../../../utils/jwt';

describe('Geographics States Controller', () => {
    function createState() : State {
        const state = new State();
        state.uf = 'GO';
        state.name = 'Goiás';
        state.lat = 0;
        state.long = 0;
        state.code = 101;
        return state;
    };

    function createCities(state: State): City[] {
        const city1 = new City();
        city1.code = 100;
        city1.name = 'My Name';
        city1.lat = 0;
        city1.long = 0;
        city1.state = state;
        const city2 = new City();
        city2.code = 101;
        city2.name = 'New Name';
        city2.lat = 0;
        city2.long = 0;
        city2.state = state;
        return [city1, city2];
    }

    let states = [createState()];
    let cities = [...createCities(states[0])];

    beforeAll(async () => {
        const conn = await createConnection();
        if (!conn) {
            return;
        }
        const stateRepo = conn.getRepository(State);
        const cityRepo = conn.getRepository(City);
        states = await stateRepo.save(states);
        cities = await cityRepo.save(cities);
    });

    afterAll(async () => {
        const conn = getConnection();
        await conn.close();
    });

    it('Should be list all states', async () => {
        const response = await request(app)
            .get('/geo/states')
            .set('Authorization', `Bearer ${generateToken({ id: 1 })}`)
            .send();

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('results');
        expect(response.body.results).not.toBeUndefined();
        expect(response.body.results).not.toBeNull();
        expect(response.body.results).toHaveLength(states.length);
    });

    it('Should be list all cities using code', async () => {
        const [state] = states;
        const response = await request(app)
            .get(`/geo/states/${state.code}`)
            .set('Authorization', `Bearer ${generateToken({ id: 1 })}`)
            .send();
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('results');
        expect(response.body.results).not.toBeUndefined();
        expect(response.body.results).not.toBeNull();
        expect(response.body.results).toHaveLength(cities.length);
    });

    it('Should be list all cities using UF', async () => {
        const [state] = states;
        const response = await request(app)
            .get(`/geo/states/${state.uf}`)
            .set('Authorization', `Bearer ${generateToken({ id: 1 })}`)
            .send();
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('results');
        expect(response.body.results).not.toBeUndefined();
        expect(response.body.results).not.toBeNull();
        expect(response.body.results).toHaveLength(cities.length);
    });

    it('Should be return 404 if parse a state that not exists', async () => {
        const response = await request(app)
            .get(`/geo/states/ANY`)
            .set('Authorization', `Bearer ${generateToken({ id: 1 })}`)
            .send();
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body).toHaveProperty('message');
    });
});
