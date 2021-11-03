import { Admin, Student, User } from './peoples';
import { Tag, Subject } from './school';
import { City, State } from './geographics';

export * from './peoples';
export * from './school';
export * from './geographics';

export const Entities = [
    Admin,
    Student,
    User,
    Tag,
    Subject,
    State,
    City,
];
