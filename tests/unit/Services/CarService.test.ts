import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import ICar from '../../../src/Interfaces/ICar';
import CarsODM from '../../../src/Models/CarODM';
import CarsService from '../../../src/Services/CarsService';
import ErrorTeste from '../../../src/utils/ClassError';

describe('Testes da Model Cars', function () {
  it('Criando um novo car', async function () {
    // Arrange
    const bodyCar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const newCar: ICar = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    // Action
    Sinon.stub(Model, 'create').resolves(newCar);
    const service = new CarsService(new CarsODM());
    const carCreated = await service.createCar(bodyCar);
    // Assertion
    expect(carCreated).to.be.deep.equal(newCar);
  });

  it('Listando veiculos', async function () {
    // Arrange
    const listCar = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        status: false,
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];
    // Action
    Sinon.stub(Model, 'find').resolves(listCar);
    const service = new CarsService(new CarsODM());
    const carCreated = await service.findAllCars();
    // Assertion
    expect(carCreated).to.be.deep.equal(listCar);
  });

  it('Buscando veiculo por id', async function () {
    // Arrange
    const car = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    const id = '634852326b35b59438fbea2f';
    // Action
    Sinon.stub(Model, 'findById').resolves(car);
    const service = new CarsService(new CarsODM());
    const carCreated = await service.findCars(id);
    // Assertion
    expect(carCreated).to.be.deep.equal(car);
  });

  it('Buscando veiculo por id mongodb incorreto', async function () {
    // Arrange
    const id = '5729374598237498578920';
    // Action
    Sinon.stub(Model, 'findById').resolves(null);
    const service = new CarsService(new CarsODM());
    try {
      await service.findCars(id);
    } catch (error) {
      expect((error as ErrorTeste).message).to.be.deep.equal('Invalid mongo id');
    }
  });

  it('Buscando veiculo por id que nao existe', async function () {
    // Arrange
    const id = '634852326b35b59438fbea2f';
    // Action
    Sinon.stub(Model, 'findById').resolves(null);
    const service = new CarsService(new CarsODM());
    try {
      await service.findCars(id);
    } catch (error) {
      expect((error as ErrorTeste).message).to.be.deep.equal('Car not found');
    }
  });

  afterEach(function () {
    Sinon.restore();
  });
});