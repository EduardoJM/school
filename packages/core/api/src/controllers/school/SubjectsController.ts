import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Subject } from '../../entities';

export interface SubjectCreateRequestBody {
    name: string;
    active?: boolean;
    icon?: string;
}

export default class SubjectsController {
    static async create(request: Request<SubjectCreateRequestBody>, response: Response) {
        const {
            name, icon, active
        } = request.body;
        // TODO: add try/catch on needed statements
        const subjectRepo = getRepository(Subject);
        const alreadyNamed = await subjectRepo.findOne({ name });
        if (alreadyNamed) {
            // TODO: separar mensagens...
            return response.status(409).json({
                'message': 'Já cadastrada'
            });
        }
        const subject = new Subject();
        subject.name = name;
        subject.active = active !== undefined ? active : true;
        subject.icon = icon;
        const result = await subjectRepo.save(subject);
        return response.status(201).json(result);
    }

    static async list(request: Request, response: Response) {
        // TODO: add try/catch on needed statements
        const subjectRepo = getRepository(Subject);
        return response.json(subjectRepo.find());
    }
}
