import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../../entities';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async alreadyEmailUsed(email: string): Promise<boolean> {
        const user = await this.findOne({ email });
        return user !== undefined;
    }
}
