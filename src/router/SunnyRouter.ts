import { Router } from 'express';

import PlantController from '../controllers/PlantController';

const plantController = new PlantController();

const sunnyRouter = Router();

sunnyRouter.get('/', (req, res, next) => plantController.getPlantsThatNeedsSun(req, res, next));

export default sunnyRouter;
