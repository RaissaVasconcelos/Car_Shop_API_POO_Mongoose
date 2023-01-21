import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/Car.service';
import { HttpCode } from '../utils/httpCode';

class CarController {
  private service: CarService;

  constructor(private req: Request, private res: Response, private next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car = this.req.body;
    try {
      const newCar = await this.service.create(car);
      return this.res.status(HttpCode.CREATE).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async find() {
    try {
      const cars = await this.service.find();
      return this.res.status(HttpCode.OK).json(cars);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    try {
      const { id } = this.req.params;
      const car = await this.service.findById(id);
      if (!car) {
        return this.res.status(HttpCode.NOT_FOUND).json({ message: 'Car not found' });
      }
      
      return this.res.status(HttpCode.OK).json(car);
    } catch (error) {
      const err = (error as Error).message;
      if (err.includes('ObjectId failed for value')) {
        return this.res.status(HttpCode.UNPROCESSABLE_ENTITY).json({ message: 'Invalid mongo id' });
      }
    }
  }

  public async updatedCar() {
    try {
      const { id } = this.req.params;
      const car = this.req.body;
      const updated = await this.service.updateCar(id, car);
      if (!updated) {
        return this.res.status(HttpCode.NOT_FOUND).json({ message: 'Car not found' });
      }
      return this.res.status(HttpCode.OK).json(updated);
    } catch (error) {
      const err = (error as Error).message;
      if (err.includes('ObjectId failed for value')) {
        return this.res.status(HttpCode.UNPROCESSABLE_ENTITY).json({ message: 'Invalid mongo id' });
      }
    }
  }

  public async delete() {
    try {
      const { id } = this.req.params;
      const deleted = await this.service.delete(id);
      if (!deleted) {
        return this.res.status(HttpCode.NOT_FOUND).json({ message: 'Car not found' });
      }
      this.res.status(HttpCode.NO_CONTENT).end();
      return this.res.status(204).end();
    } catch (error) {
      const err = (error as Error).message;
      if (err.includes('ObjectId failed for value')) {
        return this.res.status(HttpCode.UNPROCESSABLE_ENTITY).json({ message: 'Invalid mongo id' });
      }
    }
  }
}

export default CarController;
