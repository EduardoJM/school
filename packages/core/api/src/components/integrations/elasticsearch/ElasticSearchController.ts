import { Request, Response } from 'express';
import { Client } from 'elasticsearch';
import { getRepository } from 'typeorm';
import { getElasticSearchClient } from '../../../integrations';
import { Subject, Tag } from '../../school/SchoolEntities';
import { TagsElasticSearch } from '../../school/tags/TagsElasticSearch';
import { SubjectsElasticSearch } from '../../school/subjects/SubjectsElasticSearch';
import { subjectsCreateIndexData } from './indices/subjects';
import { tagsCreateIndexData } from './indices/tags';

export class ElasticSearchController {
    private static async tryDeleteIndex(client: Client, index: string) {
        try {
            await client.indices.delete({ index });
        } catch {}
    }

    private static async deleteAndRecreate(client: Client, index: string, data: any) {
        await ElasticSearchController.tryDeleteIndex(client, index);
        await client.indices.create({
            index,
            body: data,
        });
    }

    private static async recreateSubjects(client: Client) {
        await ElasticSearchController.deleteAndRecreate(client, 'subjects', subjectsCreateIndexData);
        const subjectsRepo = getRepository(Subject);
        const subjects = await subjectsRepo.find();
        for (let i = 0; i < subjects.length; i += 1) {
            await SubjectsElasticSearch.updateIndexes(subjects[i]);
        }
    }

    private static async recreateTags(client: Client) {
        await ElasticSearchController.deleteAndRecreate(client, 'tags', tagsCreateIndexData);
        const tagsRepo = getRepository(Tag);
        const tags = await tagsRepo.find({ relations: ['subject'] });
        for (let i = 0; i < tags.length; i += 1) {
            await TagsElasticSearch.updateIndexes(tags[i]);
        }
    }

    async recreate(request: Request, response: Response) {
        const client = getElasticSearchClient();
        await ElasticSearchController.recreateSubjects(client);
        await ElasticSearchController.recreateTags(client);
        return response.send();
    }
}
