import { api } from '../api';
import { Subject, PaginatedSubjects, SubjectsPaginationOptions } from '../../entities';

export async function createSubject(data: FormData): Promise<Subject> {
    const result = await api.post<Subject>('/school/subjects', data);
    return result.data;
}

export async function partialUpdateSubject({ id, data } : { id: number | string; data: FormData; }): Promise<Subject> {
    const result = await api.patch<Subject>(`/school/subjects/${id}`, data);
    return result.data;
};

export async function getSubjects(opts?: SubjectsPaginationOptions): Promise<PaginatedSubjects> {
    let url = '/school/subjects';
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
    const result = await api.get<PaginatedSubjects>(url);
    return result.data;
}

export async function getSubjectById(id: number | string): Promise<Subject> {
    const result = await api.get<Subject>(`/school/subjects/${id}`);
    return result.data;
}

export async function deleteSubject(id: number | string): Promise<Subject> {
    const result = await api.delete<Subject>(`/school/subjects/${id}`);
    return result.data;
}
