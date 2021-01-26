import { getCustomRepository } from 'typeorm';
import md5 from 'md5';
import User from '../../models/User';
import UsersRepository from '../../repositories/UserRepository';

class AuthUserService {
  public async execute(email: string, password: string): Promise<User> {
    if (!(email && password)) throw Error('Fields are missing');

    const userRepository = getCustomRepository(UsersRepository);

    const passwordhash = md5(password);

    const user = await userRepository.findOne({
      email,
      password: passwordhash,
    });

    if (!user) throw Error('Login or password invalid');

    return user;
  }
}

export default AuthUserService;
