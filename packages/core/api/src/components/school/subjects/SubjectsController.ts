import { Request, Response } from 'express';
import path from 'path';
import { getRepository } from 'typeorm';
import { ParamsDictionary } from 'express-serve-static-core';
import { Subject } from './SubjectsEntity';
import {
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_404_NOT_FOUND,
    HTTP_409_CONFLICT,
    HTTP_500_INTERNAL_SERVER_ERROR,
    responses,
} from '../../../constants';
import { removeFileIfExists } from '../../../utils/files';
import { SubjectsElasticSearch } from './SubjectsElasticSearch';

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
            
            await SubjectsElasticSearch.updateIndexes(result);

            return response.status(HTTP_201_CREATED).json(result);
        } catch (err) {
            console.log(`ERROR: trying to save a subject.\r\n\r\n ${JSON.stringify(err)}`);
            return response.status(HTTP_500_INTERNAL_SERVER_ERROR).json(responses.UNKNOWN_ERROR);
        }
    }

    async updateComplete(request: Request<SubjectsIdParams, any, SubjectCreateRequestBody>, response: Response) {
        const {
            name, icon, active
        } = request.body;
        const { id: idStr } = request.params;
        const id = parseInt(idStr);
        const subjectRepo = getRepository(Subject);
        try {
            const subject = await subjectRepo.findOne({ id });
            if (!subject) {
                removeFileIfExists(path.resolve(
                    __dirname, '..', '..', '..', '..', 'media', 'icons', 'subjects', icon,
                ));
                return response.status(HTTP_404_NOT_FOUND).json(responses.RESOURCE_NOT_FOUND);
            }
            const alreadyNamed = await subjectRepo.findOne({ name });
            if (alreadyNamed && alreadyNamed.id !== subject.id) {
                removeFileIfExists(path.resolve(
                    __dirname, '..', '..', '..', '..', 'media', 'icons', 'subjects', icon,
                ));
                return response.status(HTTP_409_CONFLICT).json(responses.RESOURCE_NAME_ALREADY_USED);
            }
            removeFileIfExists(path.resolve(
                __dirname, '..', '..', '..', '..', 'media', 'icons', 'subjects', subject.icon,
            ));
            subject.name = name;
            subject.icon = icon;
            subject.active = active;
            const result = await subjectRepo.save(subject);

            await SubjectsElasticSearch.updateIndexes(result);

            return response.status(HTTP_200_OK).json(result);
        } catch (err) {
            console.log(`ERROR: trying to update a subject.\r\n\r\n ${JSON.stringify(err)}`);
            return response.status(HTTP_500_INTERNAL_SERVER_ERROR).json(responses.UNKNOWN_ERROR);
        }
    }

    async updatePartial(request: Request<SubjectsIdParams, any, Partial<SubjectCreateRequestBody>>, response: Response) {
        const {
            name, icon, active
        } = request.body;
        const { id: idStr } = request.params;
        const id = parseInt(idStr);
        const subjectRepo = getRepository(Subject);
        try {
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
                const alreadyNamed = await subjectRepo.findOne({ name });
                if (alreadyNamed && alreadyNamed.id !== subject.id) {
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
                subject.icon = icon;
            }
            if (name) {
                subject.name = name;
            }
            if (active !== undefined) {
                subject.active = active;
            }
            const result = await subjectRepo.save(subject);

            await SubjectsElasticSearch.updateIndexes(result);

            return response.status(HTTP_200_OK).json(result);
        } catch (err) {
            console.log(`ERROR: trying to update a subject.\r\n\r\n ${JSON.stringify(err)}`);
            return response.status(HTTP_500_INTERNAL_SERVER_ERROR).json(responses.UNKNOWN_ERROR);
        }
    }

    async delete(request: Request<SubjectsIdParams, any, SubjectCreateRequestBody>, response: Response) {
        const { id: idStr } = request.params;
        const id = parseInt(idStr);
        const subjectRepo = getRepository(Subject);
        try {
            const subject = await subjectRepo.findOne({ id });
            if (!subject) {
                return response.status(HTTP_404_NOT_FOUND).json(responses.RESOURCE_NOT_FOUND);
            }
            removeFileIfExists(path.resolve(
                __dirname, '..', '..', '..', '..', 'media', 'icons', 'subjects', subject.icon,
            ));
            await subjectRepo.remove(subject);
        } catch (err) {
            console.log(`ERROR: trying to delete a subject.\r\n\r\n ${JSON.stringify(err)}`);
            return response.status(HTTP_500_INTERNAL_SERVER_ERROR).json(responses.UNKNOWN_ERROR);
        }

        await SubjectsElasticSearch.deleteIndexes(String(id));

        return response.status(HTTP_204_NO_CONTENT).send();
    }

    async getById(request: Request<SubjectsIdParams, any, any>, response: Response) {
        const { user } = request;
        const { id: idStr } = request.params;
        const id = parseInt(idStr);
        const subjectRepo = getRepository(Subject);
        try {
            const subject = await subjectRepo.findOne({ id });
            if (!subject) {
                return response.status(HTTP_404_NOT_FOUND).json(responses.RESOURCE_NOT_FOUND);
            }
            if (user && user.getUserType() === 'STUDENT') {
                if (!subject.active) {
                    return response.status(HTTP_404_NOT_FOUND).json(responses.RESOURCE_NOT_FOUND);
                }
            }
            return response.status(HTTP_200_OK).json(subject.serialize());
        } catch (err) {
            console.log(`ERROR: trying to get a subject.\r\n\r\n ${JSON.stringify(err)}`);
            return response.status(HTTP_500_INTERNAL_SERVER_ERROR).json(responses.UNKNOWN_ERROR);
        }
    }

    async list(request: Request<any, any, any, PaginationParams>, response: Response) {
        const {
            page,
            search,
        } = request.query;
        const { user } = request;

        const pageNumber = parseInt(page || '1', 10);

        try {
            const result = await SubjectsElasticSearch.search(search || '', pageNumber, user);
            return response.json(result);
        } catch(err) {
            console.log(`ERROR: trying to search subjects from elasticsearch.\r\n\r\n ${JSON.stringify(err)}`);
            return response.status(HTTP_500_INTERNAL_SERVER_ERROR).json(responses.UNKNOWN_ERROR);
        }
    }
}
