import { Router } from 'express';
import { MongoClient } from 'mongodb';
import UserRepository from '../repositories/UserRepository';

import CreateUserService from '../services/CreateUserService';
import FindUsersService from '../services/FindUsersService';

const userRouter = Router();
const mongodb = new MongoClient(
  'URL',
  { useUnifiedTopology: true },
);

mongodb.connect(error => {
  if (error) throw Error(error.message);

  const db = mongodb.db('users');

  const userRepository = new UserRepository(db);

  userRouter.post('/', async (request, response) => {
    try {
      const { email, password } = request.body;

      const createUser = new CreateUserService(userRepository);

      const user = await createUser.execute({ email, password });

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  });

  userRouter.get('/', (req, res) => {
    try {
      const findUser = new FindUsersService(userRepository);

      const user = findUser.execute();

      return res.status(200).json({ user });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });
});

export default userRouter;
