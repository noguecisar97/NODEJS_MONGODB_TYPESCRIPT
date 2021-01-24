import UsersRepository from '../repositories/UserRepository';

class FindUsersService {
  private usersRepository: UsersRepository;

  constructor(userRepository: UsersRepository) {
    this.usersRepository = userRepository;
  }

  public async execute() {
    const users = await this.usersRepository.findAllUsers();
    return users;
  }
}

export default FindUsersService;
