import UsersRepository from '../repositories/UserRepository';

interface MongodbDTO {
  _id: string;
  id: string;
  email: string;
  password: string;
}

class FindUsersService {
  private usersRepository: UsersRepository;

  constructor(userRepository: UsersRepository) {
    this.usersRepository = userRepository;
  }

  public async execute(): Promise<Pick<MongodbDTO, 'email' | 'password'>[]> {
    const users = await this.usersRepository.findAllUsers();
    return users;
  }
}

export default FindUsersService;
