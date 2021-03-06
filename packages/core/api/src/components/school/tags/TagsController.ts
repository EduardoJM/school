import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { ParamsDictionary } from 'express-serve-static-core';
import { Tag,  Subject } from '../../../entities';
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

        const alreadyNamed = await tagsRepo.findOne({ name });
        if (alreadyNamed) {
            return response.status(HTTP_409_CONFLICT).json(responses.RESOURCE_NAME_ALREADY_USED);
        }

        const tag = new Tag();
        const subjectRepo = getRepository(Subject);
        const subjectItem = await subjectRepo.findOne({ where: { id: subject } });
        if (!subjectItem) {
            return response.status(HTTP_404_NOT_FOUND).json(responses.RESOURCE_NOT_FOUND);
        }
        tag.subject = subjectItem;
        tag.name = name;
        tag.active = active;

        const result = await tagsRepo.save(tag);

        TagsElasticSearch.updateIndexes(result);

        return response.status(HTTP_201_CREATED).json(result);
    }

    async updateComplete(request: Request<TagsIdParams, any, TagCreateRequestBody>, response: Response) {
        const {
            name, subject, active
        } = request.body;
        const { id: idStr } = request.params;
        const id = parseInt(idStr);
        const tagRepo = getRepository(Tag);
        const subjectRepo = getRepository(Subject);
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
    }

    async updatePartial(request: Request<TagsIdParams, any, Partial<TagCreateRequestBody>>, response: Response) {
        const {
            name, subject, active
        } = request.body;
        const { id: idStr } = request.params;
        const id = parseInt(idStr);
        const tagRepo = getRepository(Tag);
        const subjectRepo = getRepository(Subject);
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
    }

    async delete(request: Request<TagsIdParams, any, any>, response: Response) {
        const { id: idStr } = request.params;
        const id = parseInt(idStr);

        await TagsElasticSearch.deleteIndexes(idStr);

        const tagRepo = getRepository(Tag);
        const tag = await tagRepo.findOne({ id });
        if (!tag) {
            return response.status(HTTP_404_NOT_FOUND).json(responses.RESOURCE_NOT_FOUND);
        }
        await tagRepo.remove(tag);
        return response.status(HTTP_204_NO_CONTENT).send();
    }

    async getById(request: Request<TagsIdParams, any, any>, response: Response) {
        const { user } = request;
        const { id: idStr } = request.params;
        const id = parseInt(idStr);
        const tagRepo = getRepository(Tag);
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

        const result = await TagsElasticSearch.search(search || '', pageNumber, subjectId, user);
        return response.json(result);
    }
}