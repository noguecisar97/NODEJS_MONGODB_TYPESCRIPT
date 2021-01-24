import md5 from 'md5';
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
    // md5 encrypts the passed password
    const passwordhash = md5(password);

    const findUser = await this.usersRepository.findByUser({
      email,
      password: passwordhash,
    });

    if (findUser) return { error: 'This user is already created' };

    const user = await this.usersRepository.create({
      email,
      password: passwordhash,
    });

    return user;
  }
}

export default CreatUserService;
