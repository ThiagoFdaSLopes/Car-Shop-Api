import { NextFunction, Request, Response } from 'express';
import MotorcycleODM from '../Models/MotorcycleODM';
import MotorcycleService from '../Services/MotorcycleService';
import IMotorcycle from '../Interfaces/IMotorcycle';

class MotorcycleController {
  constructor(private motorcycleService = new MotorcycleService(new MotorcycleODM())) {}

  public async createMotorCycle(
    req: Request,
    res: Response, 
    next: NextFunction,
  ): Promise<Response | undefined> {
    const moto: IMotorcycle = { ...req.body };
    try {
      const carCreated = await this.motorcycleService.createCar(moto);
      return res.status(201).json(carCreated);
    } catch (error) {
      next(error);
    }
  }
}

export default MotorcycleController;