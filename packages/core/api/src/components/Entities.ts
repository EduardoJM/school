import { Admin, Student, User } from './peoples/PeoplesEntities';
import { Tag, Subject } from './school/SchoolEntities';
import { City, State } from './geographic/GeographicEntities';

export * from './peoples/PeoplesEntities';
export * from './school/SchoolEntities';
export * from './geographic/GeographicEntities';

export const Entities = [
    Admin,
    Student,
    User,
    Tag,
    Subject,
    State,
    City,
];
