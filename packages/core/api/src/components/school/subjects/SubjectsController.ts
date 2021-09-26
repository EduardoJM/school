import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { buildPaginator, Order } from 'typeorm-cursor-pagination';
import { Subject } from './SubjectsEntity';
import { CursorQueryParams } from '../../../@types/CursorQueryParams';
import { HTTP_201_CREATED, HTTP_409_CONFLICT, HTTP_500_INTERNAL_SERVER_ERROR, responses } from '../../../constants';

export interface SubjectCreateRequestBody {
    name: string;
    active: boolean;
    icon: string;
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
                return response.status(HTTP_409_CONFLICT).json(responses.RESOURCE_NAME_ALREADY_USED);
            }
        } catch (err) {
            console.log(`ERROR: trying to check if a subject with determinated name are already registered.\r\n\r\n ${JSON.stringify(err)}`);
            return response.status(HTTP_500_INTERNAL_SERVER_ERROR).json(responses.UNKNOWN_ERROR);
        }
        const subject = new Subject();
        subject.name = name;
        subject.icon = icon;
        subject.active = active;
        try {
            const result = await subjectRepo.save(subject);
            return response.status(HTTP_201_CREATED).json(result);
        } catch (err) {
            console.log(`ERROR: trying to save a subject.\r\n\r\n ${JSON.stringify(err)}`);
            return response.status(HTTP_500_INTERNAL_SERVER_ERROR).json(responses.UNKNOWN_ERROR);
        }
    }

    async list(request: Request<any, any, any, CursorQueryParams>, response: Response) {
        const {
            size,
            after,
            before,
            search,
            orderby,
            order,
        } = request.query;
        const { user } = request;
        
        const queryBuilder = getRepository(Subject).createQueryBuilder('subject');
        if (user && user.getUserType() === 'STUDENT') {
            queryBuilder.where('subject.active = :active', { active: true });
        }
        if (search) {
            queryBuilder.where('subject.name LIKE :s', { s: `%${search}%` });
        }

        const paginator = buildPaginator({
            entity: Subject,
            paginationKeys: [(orderby as keyof Subject) || 'id'],
            query: {
                limit: parseInt(size || '10', 10),
                order: (order as Order) || 'ASC',
                afterCursor: after,
                beforeCursor: before,
            },
        });
        const { data, cursor } = await paginator.paginate(queryBuilder);
        
        return response.json({
            results: data,
            cursor,
        });
    }
}
