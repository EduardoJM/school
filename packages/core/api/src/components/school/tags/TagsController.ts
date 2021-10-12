import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { ParamsDictionary } from 'express-serve-static-core';
import { Tag } from './TagsEntity';
import { Subject } from '../subjects/SubjectsEntity';
import {
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_404_NOT_FOUND,
    HTTP_409_CONFLICT,
    HTTP_500_INTERNAL_SERVER_ERROR,
    responses,
} from '../../../constants';
import { TagsElasticSearch } from './TagsElasticSearch';

export interface TagCreateRequestBody {
    name: string;
    subject: number;
    active: boolean;
}

export interface TagsIdParams extends ParamsDictionary{
    id: string;
}

export interface PaginationParams {
    page?: string;
    search?: string;
    subject?: string;
}

export class TagsController {
    async create(request: Request<any, any, TagCreateRequestBody>, response: Response) {
        const { name, subject, active } = request.body;
        const tagsRepo = getRepository(Tag);

        try {
            const alreadyNamed = await tagsRepo.findOne({ name });
            if (alreadyNamed) {
                return response.status(HTTP_409_CONFLICT).json(responses.RESOURCE_NAME_ALREADY_USED);
            }
        } catch (err) {
            console.log(`ERROR: trying to check if a tag with determinated name are already registered.\r\n\r\n ${JSON.stringify(err)}`);
            return response.status(HTTP_500_INTERNAL_SERVER_ERROR).json(responses.UNKNOWN_ERROR);
        }

        const tag = new Tag();
        const subjectRepo = getRepository(Subject);
        try {
            const subjectItem = await subjectRepo.findOne({ where: { id: subject } });
            if (!subjectItem) {
                return response.status(HTTP_404_NOT_FOUND).json(responses.RESOURCE_NOT_FOUND);
            }
            tag.subject = subjectItem;
        } catch(err) {
            console.log(`ERROR: trying to check if a subject exists.\r\n\r\n ${JSON.stringify(err)}`);
            return response.status(HTTP_500_INTERNAL_SERVER_ERROR).json(responses.UNKNOWN_ERROR);
        }
        tag.name = name;
        tag.active = active;

        try {
            const result = await tagsRepo.save(tag);

            TagsElasticSearch.updateIndexes(result);

            return response.status(HTTP_201_CREATED).json(result);
        } catch (err) {
            console.log(`ERROR: trying to save a tag.\r\n\r\n ${JSON.stringify(err)}`);
            return response.status(HTTP_500_INTERNAL_SERVER_ERROR).json(responses.UNKNOWN_ERROR);
        }
    }

    async updateComplete(request: Request<TagsIdParams, any, TagCreateRequestBody>, response: Response) {
        const {
            name, subject, active
        } = request.body;
        const { id: idStr } = request.params;
        const id = parseInt(idStr);
        const tagRepo = getRepository(Tag);
        const subjectRepo = getRepository(Subject);
        try {
            const tag = await tagRepo.findOne({ id });
            if (!tag) {
                return response.status(HTTP_404_NOT_FOUND).json(responses.RESOURCE_NOT_FOUND);
            }
            const alreadyNamed = await tagRepo.findOne({ name });
            if (alreadyNamed && alreadyNamed.id !== tag.id) {
                return response.status(HTTP_409_CONFLICT).json(responses.RESOURCE_NAME_ALREADY_USED);
            }
            const subjectItem = await subjectRepo.findOne({ id: subject });
            if (!subjectItem) {
                return response.status(HTTP_404_NOT_FOUND).json(responses.RESOURCE_NOT_FOUND);
            }
            tag.subject = subjectItem;
            tag.active = active;
            tag.name = name;

            const result = await tagRepo.save(tag);
            
            await TagsElasticSearch.updateIndexes(result);

            return response.status(HTTP_200_OK).json(result);
        } catch (err) {
            console.log(`ERROR: trying to update a tag.\r\n\r\n ${JSON.stringify(err)}`);
            return response.status(HTTP_500_INTERNAL_SERVER_ERROR).json(responses.UNKNOWN_ERROR);
        }
    }

    async updatePartial(request: Request<TagsIdParams, any, Partial<TagCreateRequestBody>>, response: Response) {
        const {
            name, subject, active
        } = request.body;
        const { id: idStr } = request.params;
        const id = parseInt(idStr);
        const tagRepo = getRepository(Tag);
        const subjectRepo = getRepository(Subject);
        try {
            const tag = await tagRepo.findOne({ where: { id }, relations: ['subject'] });
            if (!tag) {
                return response.status(HTTP_404_NOT_FOUND).json(responses.RESOURCE_NOT_FOUND);
            }
            if (name) {
                const alreadyNamed = await tagRepo.findOne({ name });
                if (alreadyNamed && alreadyNamed.id !== tag.id) {
                    return response.status(HTTP_409_CONFLICT).json(responses.RESOURCE_NAME_ALREADY_USED);
                }
                tag.name = name;
            }
            if (active !== undefined) {
                tag.active = active;
            }
            if (subject) {
                const subjectItem = await subjectRepo.findOne({ id: subject });
                if (!subjectItem) {
                    return response.status(HTTP_404_NOT_FOUND).json(responses.RESOURCE_NOT_FOUND);
                }
                tag.subject = subjectItem;
            }

            const result = await tagRepo.save(tag);
            
            await TagsElasticSearch.updateIndexes(result);

            return response.status(HTTP_200_OK).json(result);
        } catch (err) {
            console.log(`ERROR: trying to update a tag.\r\n\r\n ${JSON.stringify(err)}`);
            return response.status(HTTP_500_INTERNAL_SERVER_ERROR).json(responses.UNKNOWN_ERROR);
        }
    }

    async delete(request: Request<TagsIdParams, any, any>, response: Response) {
        const { id: idStr } = request.params;
        const id = parseInt(idStr);

        await TagsElasticSearch.deleteIndexes(idStr);

        const tagRepo = getRepository(Tag);
        try {
            const tag = await tagRepo.findOne({ id });
            if (!tag) {
                return response.status(HTTP_404_NOT_FOUND).json(responses.RESOURCE_NOT_FOUND);
            }
            await tagRepo.remove(tag);
        } catch (err) {
            console.log(`ERROR: trying to delete a tag.\r\n\r\n ${JSON.stringify(err)}`);
            return response.status(HTTP_500_INTERNAL_SERVER_ERROR).json(responses.UNKNOWN_ERROR);
        }

        return response.status(HTTP_204_NO_CONTENT).send();
    }

    async getById(request: Request<TagsIdParams, any, any>, response: Response) {
        const { user } = request;
        const { id: idStr } = request.params;
        const id = parseInt(idStr);
        const tagRepo = getRepository(Tag);
        try {
            const tag = await tagRepo.findOne({ id });
            if (!tag) {
                return response.status(HTTP_404_NOT_FOUND).json(responses.RESOURCE_NOT_FOUND);
            }
            if (user && user.getUserType() === 'STUDENT') {
                if (!tag.getHierarchicalActive()) {
                    return response.status(HTTP_404_NOT_FOUND).json(responses.RESOURCE_NOT_FOUND);
                }
            }
            return response.status(HTTP_200_OK).json(tag);
        } catch (err) {
            console.log(`ERROR: trying to get a subject.\r\n\r\n ${JSON.stringify(err)}`);
            return response.status(HTTP_500_INTERNAL_SERVER_ERROR).json(responses.UNKNOWN_ERROR);
        }
    }

    async list(request: Request<any, any, any, PaginationParams>, response: Response) {
        const {
            page,
            search,
            subject,
        } = request.query;
        const { user } = request;

        const pageNumber = parseInt(page || '1', 10);
        const subjectId = parseInt(subject || '-1', 10);

        try {
            const result = await TagsElasticSearch.search(search || '', pageNumber, subjectId, user);
            return response.json(result);
        } catch(err) {
            console.log(`ERROR: trying to search subjects from elasticsearch.\r\n\r\n ${JSON.stringify(err)}`);
            return response.status(HTTP_500_INTERNAL_SERVER_ERROR).json(responses.UNKNOWN_ERROR);
        }
    }
}