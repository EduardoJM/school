import { Admin, Student, User } from './peoples/PeoplesEntities';
import { Tag, Subject } from './school/SchoolEntities';

export * from './peoples/PeoplesEntities';
export * from './school/SchoolEntities';

export const Entities = [
    Admin,
    Student,
    User,
    Tag,
    Subject,
];
