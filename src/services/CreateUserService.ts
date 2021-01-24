import md5 from 'md5';
import UsersRepository from '../repositories/UserRepository';

interface RequestDTO {
  emailReq: string;
  passwordReq: string;
}

interface Err {
  error: string;
}

interface ResponseDTO {
  id: string;
  email: string;
}

class CreatUserService {
  private usersRepository: UsersRepository;

  constructor(userRepository: UsersRepository) {
    this.usersRepository = userRepository;
  }

  public async execute({
    emailReq,
    passwordReq,
  }: RequestDTO): Promise<ResponseDTO | Err> {
    // md5 encrypts the passed password
    const passwordhash = md5(passwordReq);

    const findUser = await this.usersRepository.findByUser({
      email: emailReq,
      password: passwordhash,
    });

    if (findUser) return { error: 'This user is already created' };

    const user = await this.usersRepository.create({
      email: emailReq,
      password: passwordhash,
    });

    const { id, email } = user;

    const profile: ResponseDTO = {
      id,
      email,
    };

    return profile;
  }
}

export default CreatUserService;
