import { Router } from 'express';

import CreateProfileService from '../services/Profile/CreateProfileService';

const profileRouter = Router();

profileRouter.get('/', async (req, res) => {
  try {
    const { id, nick, elo } = req.body;

    const createProfile = new CreateProfileService();

    const profile = await createProfile.execute({ id, nick, elo });

    return res.status(200).json(profile);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default profileRouter;
