import { EntityRepository, Repository } from 'typeorm';
import User from '../models/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  // find user in the database
  public async findByEmail(email: string): Promise<User | null> {
    const findUser = await this.findOne({ email });

    return findUser || null;
  }

  public async findById(id: string): Promise<User | null> {
    const findUser = await this.findOne({ id });

    return findUser || null;
  }
}

export default UserRepository;
