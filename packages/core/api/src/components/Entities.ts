import { Admin, Student, User } from './peoples/PeoplesEntities';
import { Tag, Subject } from './school/SchoolEntities';
import { City, State } from './geographics/GeographicEntities';

export * from './peoples/PeoplesEntities';
export * from './school/SchoolEntities';
export * from './geographics/GeographicEntities';

export const Entities = [
    Admin,
    Student,
    User,
    Tag,
    Subject,
    State,
    City,
];
