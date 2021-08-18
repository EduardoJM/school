import { AxiosInstance } from 'axios';
import axios from './axios';
import {
    SubjectPage,
} from '../../types/inventare';

const SubjectsService = {
    async retrieveSubjects(page: number, api?: AxiosInstance): Promise<SubjectPage> {
        return (api || axios)
            .get<SubjectPage>('/subjects', { params: { page } })
            .then((response) => response.data);
    },
};

export default SubjectsService;
