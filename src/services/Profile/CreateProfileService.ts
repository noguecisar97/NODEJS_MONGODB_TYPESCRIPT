import { getCustomRepository } from 'typeorm';
import Profile from '../../models/Profile';
import ProfileRepository from '../../repositories/ProfileRepository';

interface Request {
  id: string;
  nick: string;
  elo: string;
}

class CreateProfileService {
  public async execute({ id, nick, elo }: Request): Promise<Profile> {
    const createProfile = getCustomRepository(ProfileRepository);

    const profileExist = await createProfile.find({ userID: id });

    if (profileExist.length >= 1) throw Error('Profile already exist.');

    const profile = await createProfile.create({
      userID: id,
      nick,
      elo,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await createProfile.save(profile);

    return profile;
  }
}

export default CreateProfileService;
