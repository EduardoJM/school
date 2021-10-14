import { Subject } from './Subject';

export interface Tag {
    id: number;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    subject: Subject | number;
}

export interface PaginatedTags {
    results: Tag[];
    count: number;
    pages: number;
}

export interface TagsPaginationOptions {
    search?: string;
    page?: string;
    subject?: string;
}
