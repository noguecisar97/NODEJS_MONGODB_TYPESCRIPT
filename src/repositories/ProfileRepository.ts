import { EntityRepository, Repository } from 'typeorm';
import Profile from '../models/Profile';

@EntityRepository(Profile)
class UserRepository extends Repository<Profile> {}

export default UserRepository;
