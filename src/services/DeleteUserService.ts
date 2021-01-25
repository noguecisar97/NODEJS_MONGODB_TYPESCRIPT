import { getCustomRepository } from 'typeorm';
import User from '../models/User';
import UsersRepository from '../repositories/UserRepository';

class DeleteUserService {
  public async execute(id: string, email: string): Promise<User | undefined> {
    const DeleteUser = getCustomRepository(UsersRepository);

    const existUser = await DeleteUser.findOne({ id, email });

    if (!existUser) throw Error('User does not exist');

    await DeleteUser.delete({ id, email });

    const user = await DeleteUser.findOne({ id, email });

    if (user) throw Error('User not deleted');

    return user;
  }
}

export default DeleteUserService;
