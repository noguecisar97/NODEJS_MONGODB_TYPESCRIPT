import User from '../models/User';
import UsersRepository from '../repositories/UserRepository';

class FindUsersService {
  private usersRepository: UsersRepository;

  constructor(userRepository: UsersRepository) {
    this.usersRepository = userRepository;
  }

  public execute() {
    return this.usersRepository.findAllUsers();
  }
}

export default FindUsersService;
