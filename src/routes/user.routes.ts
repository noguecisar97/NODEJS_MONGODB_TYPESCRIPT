import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UserRepository';

import CreateUserService from '../services/CreateUserService';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  const usersRepository = getCustomRepository(UserRepository);
  const users = await usersRepository.find();

  return res.json(users);
});

userRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      email,
      password,
    });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default userRouter;
