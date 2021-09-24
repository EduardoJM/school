import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Subject } from './SubjectsEntity';

export interface SubjectCreateRequestBody {
    name: string;
    active?: boolean;
    icon?: string;
}

export class SubjectsController {
    async create(request: Request<any, any, SubjectCreateRequestBody>, response: Response) {
        const {
            name, icon, active
        } = request.body;
        const subjectRepo = getRepository(Subject);
        try {
            const alreadyNamed = await subjectRepo.findOne({ name });
            if (alreadyNamed) {
                // TODO: separar mensagens...
                return response.status(409).json({
                    'message': 'Já cadastrada'
                });
            }
        } catch (err) {
            console.log(`ERROR: trying to check if a subject with determinated name are already registered.\r\n\r\n ${JSON.stringify(err)}`);
        }
        const subject = Subject.create({ name, active: active !== undefined ? active : true, icon: icon || '' });
        try {
            const result = await subjectRepo.save(subject);
            return response.status(201).json(result);
        } catch (err) {
            console.log(`ERROR: trying to save a subject.\r\n\r\n ${JSON.stringify(err)}`);
            // TODO: add a better error message here.
            return response.status(500).json({});
        }
    }

    async list(request: Request, response: Response) {
        // TODO: add try/catch on needed statements
        const subjectRepo = getRepository(Subject);
        return response.json(await subjectRepo.find());
    }
}
