import { Client } from 'elasticsearch';
import { getConnection, getRepository } from 'typeorm';
import dotenv from 'dotenv';
import { getElasticSearchClient } from '../../src/integrations';
import { Subject, Tag } from '../../src/entities';
import { TagsElasticSearch } from '../../src/components/school/tags/TagsElasticSearch';
import { SubjectsElasticSearch } from '../../src/components/school/subjects/SubjectsElasticSearch';
import { subjectsCreateIndexData } from './indices/subjects';
import { tagsCreateIndexData } from './indices/tags';
import '../../src/database';

async function tryDeleteIndex(client: Client, index: string) {
    try {
        await client.indices.delete({ index });
    } catch {}
}

async function deleteAndRecreate(client: Client, index: string, data: any) {
    await tryDeleteIndex(client, index);
    await client.indices.create({
        index,
        body: data,
    });
}

async function recreateSubjects(client: Client) {
    await deleteAndRecreate(client, 'subjects', subjectsCreateIndexData);
    const subjectsRepo = getRepository(Subject);
    const subjects = await subjectsRepo.find();
    for (let i = 0; i < subjects.length; i += 1) {
        await SubjectsElasticSearch.updateIndexes(subjects[i]);
    }
}

async function recreateTags(client: Client) {
    await deleteAndRecreate(client, 'tags', tagsCreateIndexData);
    const tagsRepo = getRepository(Tag);
    const tags = await tagsRepo.find({ relations: ['subject'] });
    for (let i = 0; i < tags.length; i += 1) {
        await TagsElasticSearch.updateIndexes(tags[i]);
    }
}

async function recreate() {
    dotenv.config();
    try {
        const conn = getConnection();

        console.log('connected');
        const client = getElasticSearchClient();
        console.log('recreate subjects');
        await recreateSubjects(client);
        console.log('recreate tags');
        await recreateTags(client);
    } catch(error) {
        setTimeout(recreate, 1000);
    }
}

setTimeout(recreate, 1000);
