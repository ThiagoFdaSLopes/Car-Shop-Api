import ICar from '../Interfaces/ICar';

class Car {
  protected id?: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean | undefined;
  protected buyValue: number;
  private _doorsQty: number;
  private _seatsQty: number;
  
  constructor({ model, year, color, buyValue, doorsQty, seatsQty, id, status }: ICar) {
    this.model = model;
    this.year = year;
    this.color = color;
    this.buyValue = buyValue;
    this._doorsQty = doorsQty;
    this._seatsQty = seatsQty;
    this.id = id;
    this.status = status || false;
  }
  
  public CarModel() {
    return {
      id: this.id,
      model: this.model,
      year: this.year,
      color: this.color,
      status: this.status,
      buyValue: this.buyValue,
      doorsQty: this._doorsQty,
      seatsQty: this._seatsQty,
    };
  }
}

export default Car;