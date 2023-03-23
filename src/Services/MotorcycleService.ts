import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import ErrorTeste from '../utils/ClassError';

class MotorcycleService {
  private _modelODM: MotorcycleODM;

  constructor(modelODM: MotorcycleODM) {
    this._modelODM = modelODM;
  }

  public async createCar(objMoto: IMotorcycle): Promise<IMotorcycle | null> {
    const created = await this._modelODM.create(objMoto);
    return new Motorcycle(created).MotorCiclyModel();
  }

  public async findMotors(id: string): Promise<IMotorcycle | null> {
    if (!isValidObjectId(id)) throw new ErrorTeste('Invalid mongo id', 422);
    const motors = await this._modelODM.findById(id);
    if (motors === null) throw new ErrorTeste('Motorcycle not found', 404);
    return new Motorcycle(motors).MotorCiclyModel();
  }

  public async findAllMotors(): Promise<IMotorcycle[] | null> {
    const motors = await this._modelODM.findAll();
    const result = motors.map((moto: IMotorcycle) => ({
      id: moto.id,
      model: moto.model,
      year: moto.year,
      color: moto.color,
      status: moto.status,
      buyValue: moto.buyValue,
      category: moto.category,
      engineCapacity: moto.engineCapacity,
    }));

    return result;
  }

  public async UpdateMoto(obj: IMotorcycle, id: string): Promise<IMotorcycle | null> {
    if (!isValidObjectId(id)) throw new ErrorTeste('Invalid mongo id', 422);
    const result = await this._modelODM.updateVehicle(id, obj);
    if (!result) throw new ErrorTeste('Motorcycle not found', 404);
    return new Motorcycle(result).MotorCiclyModel();
  }
}

export default MotorcycleService;