import { api } from '../api';
import { Subject, CursorPaginatedSubjects } from '../../entities';

export async function createSubject(data: FormData): Promise<Subject> {
    const result = await api.post<Subject>('/school/subjects', data);
    return result.data;
}

export async function getSubjects(): Promise<CursorPaginatedSubjects> {
    const result = await api.get<CursorPaginatedSubjects>('/school/subjects');
    return result.data;
}
