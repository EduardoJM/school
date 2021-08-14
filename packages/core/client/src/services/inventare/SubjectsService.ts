import axios from './axios';
import {
    SubjectPage
 } from '../../types/inventare';
import { AxiosInstance } from 'axios';

const SubjectsService = {
    retrieveSubjects: async function(page: number, api?: AxiosInstance): Promise<SubjectPage> {
        return (api || axios)
            .get<SubjectPage>('/subjects', { params: { page } })
            .then((response) => response.data);
    },
};

export default SubjectsService;
