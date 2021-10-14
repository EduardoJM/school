import { api } from '../../api';
import { PaginatedTags, Tag, TagsPaginationOptions } from '../../entities';

export const TagServices = {
    async create(data: FormData): Promise<Tag> {
        const result = await api.post<Tag>('/school/tags', data);
        return result.data;
    },    
    async partialUpdate({ id, data } : { id: number | string; data: FormData | Object; }): Promise<Tag> {
        const result = await api.patch<Tag>(`/school/tags/${id}`, data);
        return result.data;
    },
    async fullUpdate({ id, data } : { id: number | string; data: FormData | Object; }): Promise<Tag> {
        const result = await api.patch<Tag>(`/school/tags/${id}`, data);
        return result.data;
    },
    async list(opts?: TagsPaginationOptions): Promise<PaginatedTags> {
        let url = '/school/tags';
        let params = '';
        if (opts) {
            Object.keys(opts).forEach((k) => {
                if (Object.prototype.hasOwnProperty.call(opts, k)) {
                    if ((opts as any)[k] !== undefined) {
                        params = `${params}${params === '' ? `?${k}=${(opts as any)[k]}` : `&${k}=${(opts as any)[k]}`}`;
                    }
                }
            });
        }
        if (params !== '') {
            url = `${url}${params}`;
        }
        const result = await api.get<PaginatedTags>(url);
        return result.data;
    },
    async getById(id: number | string): Promise<Tag> {
        const result = await api.get<Tag>(`/school/tags/${id}`);
        return result.data;
    },
    async delete(id: number | string): Promise<any> {
        const result = await api.delete<any>(`/school/tags/${id}`);
        return result.data;
    },
};
