import { Router } from 'express';
import userRoutes from './user.routes';
import profileRoutes from './profile.routes';

const routes = Router();

routes.use('/v1/user', userRoutes);
routes.use('/v1/profile', profileRoutes);

export default routes;
