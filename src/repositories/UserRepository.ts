import { EntityRepository, Repository } from 'typeorm';
import User from '../models/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  // find user in the database
  public async findByUser(email: string): Promise<User | null> {
    const findUser = await this.findOne({ email });

    return findUser || null;
  }
}

export default UserRepository;
