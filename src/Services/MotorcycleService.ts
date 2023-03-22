// import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
// import ErrorTeste from '../utils/ClassError';

class MotorcycleService {
  private _modelODM: MotorcycleODM;

  constructor(modelODM: MotorcycleODM) {
    this._modelODM = modelODM;
  }

  private createCarDomain(moto: IMotorcycle | null): IMotorcycle | null {
    if (moto) {
      const teste = new Motorcycle(moto);
      return teste.MotorCiclyModel();
    }
    return null;
  }

  public async createCar(objMoto: IMotorcycle): Promise<IMotorcycle | null> {
    const created = await this._modelODM.create(objMoto);
    return this.createCarDomain(created);
  }
}

export default MotorcycleService;