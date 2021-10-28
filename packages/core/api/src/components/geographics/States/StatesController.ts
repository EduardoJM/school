import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { getRepository } from 'typeorm';
import { State } from './StatesEntity';
import { HTTP_404_NOT_FOUND, HTTP_500_INTERNAL_SERVER_ERROR, responses } from '../../../constants';

export interface StateParamsDictionary extends ParamsDictionary {
    uf: string;
}

export class StatesController {
    async list(request: Request, response: Response) {
        const stateRepo = getRepository(State);
        const results = await stateRepo.find();
        return response.json({
            results,
        });
    }

    async listCities(request: Request<StateParamsDictionary, any, any>, response: Response) {
        const { uf } = request.params;
        const stateRepo = getRepository(State);
        let state: State | undefined = undefined;
        if (/\d+/.test(uf)) {
            const ufCode = parseInt(uf, 10);
            state = await stateRepo.findOne({
                where: { code: ufCode },
                relations: ['cities'],
            });
        } else {
            state = await stateRepo.findOne({
                where: { uf: uf.toUpperCase().trim() },
                relations: ['cities'],
            });
        }
        if (!state) {
            return response.status(HTTP_404_NOT_FOUND).json(responses.RESOURCE_NOT_FOUND);
        }
        return response.json({
            results: state.cities,
        });
    }
}
