import { Request, Response } from 'express';
import IService from '../interface/IService';
import IMotorcycles from '../interface/IMotorcycles';
import { HttpCode } from '../utils/httpCode';

class MotorcycleController {
  constructor(private _service: IService<IMotorcycles>){}

  public async create(
    req: Request & { body: IMotorcycles },
    res: Response<IMotorcycles>,
    ) {
    const newCar = await this._service.create(req.body);
    return res.status(HttpCode.CREATE).json(newCar);
  }

  public async find(
    req: Request,
    res: Response<IMotorcycles[]>
  ) {

    const cars = await this._service.findAll();
    return res.status(HttpCode.OK).json(cars);
  }

  public async findById(
    req: Request,
    res: Response<IMotorcycles>
  ) {
    const { id } = req.params;
    const car = await this._service.findById(id);
    return res.status(HttpCode.OK).json(car);
  }

  public async updatedMotorcycle(
    req: Request & { body: IMotorcycles },
    res: Response<IMotorcycles | null>,
  ) {
      const { id } = req.params;
      const car = req.body;
      const updated = await this._service.updated(id, car);
      return res.status(HttpCode.OK).json(updated);
  }

  public async delete(
    req: Request,
    res: Response<IMotorcycles>
  ) {
      const { id } = req.params;
      await this._service.delete(id);
      return res.status(204).end();
  }
}

export default MotorcycleController;
