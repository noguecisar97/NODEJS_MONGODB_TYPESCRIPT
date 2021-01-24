import User from '../models/User';
import UsersRepository from '../repositories/UserRepository';

interface RequestDTO {
  email: string;
  password: string;
}

interface Err {
  error: string;
}

class CreatUserService {
  private usersRepository: UsersRepository;

  constructor(userRepository: UsersRepository) {
    this.usersRepository = userRepository;
  }

  public async execute({ email, password }: RequestDTO): Promise<User | Err> {
    const findUser = await this.usersRepository.findByUser({
      email,
      password,
    });

    if (findUser) return { error: 'This user is already created' };

    const user = await this.usersRepository.create({
      email,
      password,
    });

    return user;
  }
}

export default CreatUserService;
