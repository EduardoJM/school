import { EntityRepository } from 'typeorm';
import { AbstractPolymorphicRepository } from 'typeorm-polymorphic';
import { Student } from '../entities';

@EntityRepository(Student)
export class StudentRepository extends AbstractPolymorphicRepository<
  Student
> {}
