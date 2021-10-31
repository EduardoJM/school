import { Request, Response } from 'express';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import { ParamsDictionary } from 'express-serve-static-core';
import { Subject } from './SubjectsEntity';
import { SubjectsElasticSearch } from './SubjectsElasticSearch';
import { SubjectsRepository } from './SubjectsRepository';
import {
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_404_NOT_FOUND,
    HTTP_409_CONFLICT,
    responses,
} from '../../../constants';
import { removeFileIfExists } from '../../../utils/files';

export interface SubjectCreateRequestBody {
    name: string;
    active: boolean;
    icon: string;
}

export interface SubjectsIdParams extends ParamsDictionary{
    id: string;
}

export interface PaginationParams {
    page?: string;
    search?: string;
}

export interface SearchParams {
    search?: string;
}

export class SubjectsController {
    async create(request: Request<any, any, SubjectCreateRequestBody>, response: Response) {
        const {
            name, icon, active
        } = request.body;
        const subjectRepo = getCustomRepository(SubjectsRepository);

        if (await subjectRepo.alreadyNamed(name)) {
            return response.status(HTTP_409_CONFLICT).json(responses.RESOURCE_NAME_ALREADY_USED);
        }
        const subject = Subject.create({ name, icon, active });
        const result = await subjectRepo.save(subject);
        await SubjectsElasticSearch.updateIndexes(result);
        return response.status(HTTP_201_CREATED).json(result);
    }

    async updateComplete(request: Request<SubjectsIdParams, any, SubjectCreateRequestBody>, response: Response) {
        const {
            name, icon, active
        } = request.body;
        const { id: idStr } = request.params;
        const id = parseInt(idStr);

        const subjectRepo = getCustomRepository(SubjectsRepository);
        const subject = await subjectRepo.findOne({ id });
        if (!subject) {
            removeFileIfExists(path.resolve(
                __dirname, '..', '..', '..', '..', 'media', 'icons', 'subjects', icon,
            ));
            return response.status(HTTP_404_NOT_FOUND).json(responses.RESOURCE_NOT_FOUND);
        }
        if (await subjectRepo.alreadyNamedWithoutId(name, subject.id)) {
            removeFileIfExists(path.resolve(
                __dirname, '..', '..', '..', '..', 'media', 'icons', 'subjects', icon,
            ));
            return response.status(HTTP_409_CONFLICT).json(responses.RESOURCE_NAME_ALREADY_USED);
        }
        removeFileIfExists(path.resolve(
            __dirname, '..', '..', '..', '..', 'media', 'icons', 'subjects', subject.icon,
        ));

        subject.update({ name, icon, active });
        const result = await subjectRepo.save(subject);
        await SubjectsElasticSearch.updateIndexes(result);
        return response.status(HTTP_200_OK).json(result);
    }

    async updatePartial(request: Request<SubjectsIdParams, any, Partial<SubjectCreateRequestBody>>, response: Response) {
        const {
            name, icon, active
        } = request.body;
        const { id: idStr } = request.params;
        const id = parseInt(idStr);

        const subjectRepo = getCustomRepository(SubjectsRepository);
        const subject = await subjectRepo.findOne({ id });

        if (!subject) {
            if (icon) {
                removeFileIfExists(path.resolve(
                    __dirname, '..', '..', '..', '..', 'media', 'icons', 'subjects', icon,
                ));
            }
            return response.status(HTTP_404_NOT_FOUND).json(responses.RESOURCE_NOT_FOUND);
        }
        if (name) {
            if (await subjectRepo.alreadyNamedWithoutId(name, subject.id)) {
                if (icon) {
                    removeFileIfExists(path.resolve(
                        __dirname, '..', '..', '..', '..', 'media', 'icons', 'subjects', icon,
                    ));
                }
                return response.status(HTTP_409_CONFLICT).json(responses.RESOURCE_NAME_ALREADY_USED);
            }
        }
        if (icon) {
            removeFileIfExists(path.resolve(
                __dirname, '..', '..', '..', '..', 'media', 'icons', 'subjects', subject.icon,
            ));
        }

        subject.update({ icon, name, active });
        const result = await subjectRepo.save(subject);
        await SubjectsElasticSearch.updateIndexes(result);
        return response.status(HTTP_200_OK).json(result);
    }

    async delete(request: Request<SubjectsIdParams, any, SubjectCreateRequestBody>, response: Response) {
        const { id: idStr } = request.params;
        const id = parseInt(idStr);

        await SubjectsElasticSearch.deleteIndexes(idStr);
        const subjectRepo = getCustomRepository(SubjectsRepository);
        const subject = await subjectRepo.findOne({ id });
        if (!subject) {
            return response.status(HTTP_404_NOT_FOUND).json(responses.RESOURCE_NOT_FOUND);
        }
        removeFileIfExists(
            path.resolve(
                __dirname, '..', '..', '..', '..', 'media', 'icons', 'subjects', subject.icon,
            )
        );
        await subjectRepo.remove(subject);
        return response.status(HTTP_204_NO_CONTENT).send();
    }

    async getById(request: Request<SubjectsIdParams, any, any>, response: Response) {
        const { user } = request;
        const { id: idStr } = request.params;
        const id = parseInt(idStr);

        const subjectRepo = getCustomRepository(SubjectsRepository);
        const subject = await subjectRepo.findOne({ id });
        if (!subject) {
            return response.status(HTTP_404_NOT_FOUND).json(responses.RESOURCE_NOT_FOUND);
        }
        if (user && user.getUserType() === 'STUDENT' && !subject.active) {
            return response.status(HTTP_404_NOT_FOUND).json(responses.RESOURCE_NOT_FOUND);
        }
        return response.status(HTTP_200_OK).json(subject.serialize());
    }

    async list(request: Request<any, any, any, PaginationParams>, response: Response) {
        const {
            page,
            search,
        } = request.query;
        const { user } = request;
        const pageNumber = parseInt(page || '1', 10);

        const result = await SubjectsElasticSearch.search(search || '', pageNumber, user);
        return response.json(result);
    }
}
