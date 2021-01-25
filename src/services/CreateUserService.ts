import md5 from 'md5';
import { getCustomRepository } from 'typeorm';
import { v4 } from 'uuid';
import User from '../models/User';
import UsersRepository from '../repositories/UserRepository';

interface RequestDTO {
  email: string;
  password: string;
}

class CreatUserService {
  public async execute({ email, password }: RequestDTO): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    // md5 encrypts the passed password
    const passwordhash = md5(password);

    const findUser = await usersRepository.findByEmail(email);

    if (findUser) throw Error('This user is already created');

    const user = await usersRepository.create({
      id: v4(),
      email,
      password: passwordhash,
    });

    await usersRepository.insert(user);

    return user;
  }
}

export default CreatUserService;
