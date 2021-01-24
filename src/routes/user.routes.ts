import { Router } from 'express';
import mongodb from '../data/Mongo';
import UserRepository from '../repositories/UserRepository';

import CreateUserService from '../services/CreateUserService';
import FindUsersService from '../services/FindUsersService';

const userRouter = Router();

// connect with database
mongodb.connect(error => {
  if (error) throw Error(error.message);

  const db = mongodb.db('users');

  const userRepository = new UserRepository(db);

  userRouter.post('/', async (request, response) => {
    try {
      const { email, password } = request.body;

      const createUser = new CreateUserService(userRepository);

      const user = await createUser.execute({
        emailReq: email,
        passwordReq: password,
      });

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  });

  userRouter.get('/', async (req, res) => {
    try {
      const findUser = new FindUsersService(userRepository);

      const user = await findUser.execute();

      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });
});

export default userRouter;
