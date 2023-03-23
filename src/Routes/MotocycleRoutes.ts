import { Request, Response, Router, NextFunction } from 'express';
import MotorcycleController from '../Controllers/MotocycleController';

const motorcycleController = new MotorcycleController();

const motocycleRouter = Router();

motocycleRouter.put(
  '/:id', 
  (
    req: Request,
    res: Response, 
    next: NextFunction,
  ) => motorcycleController.UpdateMotorcycle(req, res, next),
);

motocycleRouter.post(
  '/',
  (
    req: Request, 
    res: Response, 
    next: NextFunction,
  ) => motorcycleController.createMotorCycle(req, res, next),
);

motocycleRouter.get(
  '/:id', 
  (
    req: Request, 
    res: Response, 
    next: NextFunction,
  ) => motorcycleController.findMotorById(req, res, next),
);

motocycleRouter.get(
  '/', 
  (
    req: Request, 
    res: Response, 
    next: NextFunction,
  ) => motorcycleController.findAllMotoCycles(req, res, next),
);

motocycleRouter.delete(
  '/:id', 
  (
    req: Request,
    res: Response, 
    next: NextFunction,
  ) => motorcycleController.DeleteVehicle(req, res, next),
);

export default motocycleRouter;