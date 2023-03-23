import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import ErrorTeste from '../../../src/utils/ClassError';

const modelName = 'Honda Cb 600f Hornet';

describe('Testes da Model Motorcycle', function () {
  it('Criando uma nova moto', async function () {
    // Arrange
    const bodyMoto = {
      model: modelName,
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const newMoto: IMotorcycle = {
      id: '634852326b35b59438fbea2f',
      model: modelName,
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };
    // Action
    Sinon.stub(Model, 'create').resolves(newMoto);
    const service = new MotorcycleService(new MotorcycleODM());
    const motoCreated = await service.createMotor(bodyMoto);
    // Assertion
    expect(motoCreated).to.be.deep.equal(newMoto);
  });

  it('Listando Motorcycles', async function () {
    // Arrange
    const listMotors = [
      {
        id: '634852326b35b59438fbea2f',
        model: modelName,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Honda Cbr 1000rr',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      },
    ];
    // Action
    Sinon.stub(Model, 'find').resolves(listMotors);
    const service = new MotorcycleService(new MotorcycleODM());
    const motoList = await service.findAllMotors();
    // Assertion
    expect(motoList).to.be.deep.equal(listMotors);
  });

  it('Buscando motor por id', async function () {
    // Arrange
    const motor = {
      id: '634852326b35b59438fbea2f',
      model: modelName,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const id = '634852326b35b59438fbea2f';
    // Action
    Sinon.stub(Model, 'findById').resolves(motor);
    const service = new MotorcycleService(new MotorcycleODM());
    const motorSearch = await service.findMotors(id);
    // Assertion
    expect(motorSearch).to.be.deep.equal(motor);
  });

  it('Buscando motor por id mongodb incorreto', async function () {
    // Arrange
    const id = '5729374598237498578920';
    // Action
    Sinon.stub(Model, 'findById').resolves(null);
    const service = new MotorcycleService(new MotorcycleODM());
    try {
      await service.findMotors(id);
    } catch (error) {
      expect((error as ErrorTeste).message).to.be.deep.equal('Invalid mongo id');
    }
  });

  it('Buscando motor por id que nao existe', async function () {
    // Arrange
    const id = '634852326b35b59438fbea2f';
    // Action
    Sinon.stub(Model, 'findById').resolves(null);
    const service = new MotorcycleService(new MotorcycleODM());
    try {
      await service.findMotors(id);
    } catch (error) {
      expect((error as ErrorTeste).message).to.be.deep.equal('Motorcycle not found');
    }
  });

  it('Atualizando um motorcycle com id Errado', async function () {
    // Arrange
    const id = '634852326b35b59438fbea09';
    const motoUpdate = {
      model: modelName,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    // Action
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
    const service = new MotorcycleService(new MotorcycleODM());
    try {
      await service.UpdateMoto(motoUpdate, id);
    } catch (error) {
      expect((error as ErrorTeste).message).to.be.deep.equal('Motorcycle not found');
    }
    // Assertion
  });

  it('Atualizando um motorcycle com mongoId Errado', async function () {
    // Arrange
    const id = 'invalid_id';
    const motoUpdate = {
      model: modelName,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    // Action
    // Sinon.stub(Model).resolves(null);
    const service = new MotorcycleService(new MotorcycleODM());
    try {
      await service.UpdateMoto(motoUpdate, id);
    } catch (error) {
      expect((error as ErrorTeste).message).to.be.deep.equal('Invalid mongo id');
    }
    // Assertion
  });

  it('Atualizando carro com sucesso', async function () {
    // arrange
    const id = '634852326b35b59438fbea2f';
    const motor = {
      id: '634852326b35b59438fbea2f',
      model: modelName,
      year: 2005,
      color: 'White',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const motoUpdate = {
      model: modelName,
      year: 2005,
      color: 'White',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(motor);
    const service = new MotorcycleService(new MotorcycleODM());
    
    // act
    const result = await service.UpdateMoto(motoUpdate, id);
    
    // assert
    expect(result).to.be.deep.equal(motor);
  });

  afterEach(function () {
    Sinon.restore();
  });
});