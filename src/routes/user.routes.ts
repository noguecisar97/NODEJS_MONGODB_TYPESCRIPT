import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UserRepository';

import CreateUserService from '../services/User/CreateUserService';
import AlterUserService from '../services/User/AlterUserService';
import AuthUserService from '../services/User/AuthUserService';
import DeleteUserService from '../services/User/DeleteUserService';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const AuthUser = new AuthUserService();

    const user = await AuthUser.execute(email, password);

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

userRouter.get('/all', async (req, res) => {
  try {
    const usersRepository = getCustomRepository(UserRepository);
    const users = await usersRepository.find();

    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
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

userRouter.put('/', async (req, res) => {
  try {
    const { id, email, password } = req.body;

    const alterUser = new AlterUserService();

    const user = await alterUser.execute({ id, email, password });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

userRouter.delete('/', async (req, res) => {
  try {
    const { id, email } = req.body;

    const deleteUser = new DeleteUserService();

    await deleteUser.execute(id, email);

    return res.status(200).json({ msg: 'User Deleted' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default userRouter;
