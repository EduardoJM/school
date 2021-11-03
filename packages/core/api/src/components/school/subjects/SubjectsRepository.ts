import { EntityRepository, Repository } from 'typeorm';
import { Subject } from '../../../entities';

@EntityRepository(Subject)
export class SubjectsRepository extends Repository<Subject> {
    async alreadyNamed(name: string): Promise<boolean> {
        const user = await this.findOne({ name });
        return user !== undefined;
    }

    async alreadyNamedWithoutId(name: string, id: number): Promise<boolean> {
        return new Promise<boolean>(async (resolve) => {
            const user = await this.findOne({ name });
            if (user && user.id !== id) {
                return resolve(true);
            }
            return resolve(false);
        });
    }
}
