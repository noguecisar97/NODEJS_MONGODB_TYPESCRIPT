import md5 from 'md5';
import { getCustomRepository } from 'typeorm';
import { v4 } from 'uuid';
import UserInterface from '../../models/User';
import UsersRepository from '../../repositories/UserRepository';

import CreateProfileService from '../Profile/CreateProfileService';
import ProfileRepository from '../../repositories/ProfileRepository';

interface RequestDTO {
  email: string;
  password: string;
}

class CreatUserService {
  public async execute({
    email,
    password,
  }: RequestDTO): Promise<UserInterface> {
    if (!(email && password)) throw Error('Fields are missing');
    const usersRepository = getCustomRepository(UsersRepository);
    // md5 encrypts the passed password
    const passwordhash = md5(password);

    const findUser = await usersRepository.findByEmail(email);

    if (findUser) throw Error('Email address already used.');

    const User = await usersRepository.create({
      id: v4(),
      email,
      password: passwordhash,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createProfile = new CreateProfileService();

    const Profile = await createProfile.execute({
      id: User.id,
      nick: '',
      elo: '',
    });

    await getCustomRepository(ProfileRepository).save(Profile);

    await usersRepository.insert(User);

    return User;
  }
}

export default CreatUserService;
