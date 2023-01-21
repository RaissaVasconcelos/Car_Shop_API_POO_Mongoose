import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/Motorcycle.service';
import { HttpCode } from '../utils/httpCode';

class MotorcycleController {
  private service: MotorcycleService;

  constructor(private req: Request, private res: Response, private next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    try {
      const motorcycle = this.req.body;
      const newmotorcycle = await this.service.create(motorcycle);
      return this.res.status(HttpCode.CREATE).json(newmotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async find() {
    try {
      const motorcycles = await this.service.find();
      return this.res.status(HttpCode.OK).json(motorcycles);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    try {
      const { id } = this.req.params;
      const motorcycle = await this.service.findById(id);
      if (!motorcycle) {
        return this.res.status(HttpCode.NOT_FOUND).json({ message: 'Motorcycle not found' });
      }
      
      return this.res.status(HttpCode.OK).json(motorcycle);
    } catch (error) {
      const err = (error as Error).message;
      if (err.includes('ObjectId failed for value')) {
        return this.res.status(HttpCode.UNPROCESSABLE_ENTITY).json({ message: 'Invalid mongo id' });
      }
    }
  }

  public async updatedMotorcycle() {
    try {
      const { id } = this.req.params;
      const motorcycle = this.req.body;
      const updated = await this.service.update(id, motorcycle);
      if (!updated) {
        return this.res.status(HttpCode.NOT_FOUND).json({ message: 'Motorcycle not found' });
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
        return this.res.status(HttpCode.NOT_FOUND).json({ message: 'Motorcycle not found' });
      }
      return this.res.status(HttpCode.NO_CONTENT).end();
    } catch (error) {
      const err = (error as Error).message;
      if (err.includes('ObjectId failed for value')) {
        return this.res.status(HttpCode.UNPROCESSABLE_ENTITY).json({ message: 'Invalid mongo id' });
      }
    }
  }
}

export default MotorcycleController;
