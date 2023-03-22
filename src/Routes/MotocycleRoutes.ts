import { Request, Response, Router, NextFunction } from 'express';
import MotorcycleController from '../Controllers/MotocycleController';

const motorcycleController = new MotorcycleController();

const motocycleRouter = Router();

motocycleRouter.post(
  '/',
  (
    req: Request, 
    res: Response, 
    next: NextFunction,
  ) => motorcycleController.createMotorCycle(req, res, next),
);

export default motocycleRouter;