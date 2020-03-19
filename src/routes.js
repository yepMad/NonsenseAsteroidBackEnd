import { Router } from 'express';
import cors from 'cors';

import ScoreboardController from './app/controllers/ScoreboardController';

const routes = new Router();

routes.use(cors());

routes.get('/scoreboard', ScoreboardController.index);
routes.put('/scoreboard', ScoreboardController.update);

export default routes;
