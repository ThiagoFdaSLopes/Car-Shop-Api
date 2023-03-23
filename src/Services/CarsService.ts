import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarsODM from '../Models/CarODM';
import ErrorTeste from '../utils/ClassError';

class CarsService {
  private _modelODM: CarsODM;

  constructor(modelODM: CarsODM) {
    this._modelODM = modelODM;
  }

  public async createCar(objCar: ICar): Promise<ICar | null> {
    const created = await this._modelODM.create(objCar);
    return new Car(created).CarModel();
  }

  public async findCars(id: string): Promise<ICar | null> {
    if (!isValidObjectId(id)) throw new ErrorTeste('Invalid mongo id', 422);
    const cars = await this._modelODM.findById(id);
    if (cars === null) throw new ErrorTeste('Car not found', 404);
    return new Car(cars).CarModel();
  }

  public async findAllCars(): Promise<ICar[] | null> {
    const cars = await this._modelODM.findAll();
    const result = cars.map((car) => ({
      id: car.id,
      model: car.model,
      year: car.year,
      color: car.color,
      status: car.status,
      buyValue: car.buyValue,
      doorsQty: car.doorsQty,
      seatsQty: car.seatsQty,
    }));

    return result;
  }

  public async UpdateCar(obj: ICar, id: string): Promise<ICar | null> {
    if (!isValidObjectId(id)) throw new ErrorTeste('Invalid mongo id', 422);
    const result = await this._modelODM.updateVehicle(id, obj);
    if (!result) throw new ErrorTeste('Car not found', 404);
    return new Car(result).CarModel();
  }
}

export default CarsService;