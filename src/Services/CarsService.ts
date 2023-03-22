import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarsODM from '../Models/CarODM';

class CarsService {
  private _modelODM: CarsODM;

  constructor(modelODM: CarsODM) {
    this._modelODM = modelODM;
  }

  private createCarDomain(car: ICar | null): ICar | null {
    if (car) {
      const teste = new Car(car);
      return teste.CarModel();
    }
    return null;
  }

  public async createCar(objCar: ICar): Promise<ICar | null> {
    const created = await this._modelODM.create(objCar);
    return this.createCarDomain(created);
  }
}

export default CarsService;