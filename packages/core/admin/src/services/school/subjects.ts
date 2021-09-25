import { api } from '../api';
import { Subject } from '../../entities';

export async function createSubject(name: string): Promise<Subject> {
    const result = await api.post<Subject>('/school/subjects', { name });
    return result.data;
}

export async function getSubjects(): Promise<Subject[]> {
    const result = await api.get<Subject[]>('/school/subjects');
    return result.data;
}
