import ICars from '../interface/ICars';
import IService from '../interface/IService';
import { HttpCode } from '../utils/httpCode';
import { Request, Response } from 'express';

class CarController {
  constructor(private _service: IService<ICars>){}

  public async create(
    // Unimos o tipo do _request_ com um objeto que tem chave `body` com o valor de um ICars 
    // assim conseguimos extrair as propriedades da armação para passá-las para o _service_
    req: Request & { body: ICars },
    // Usamos o ICars como parâmetro genérico do Request
    // para declarar que vamos responder a requisição com um objeto do tipo ICars
    res: Response<ICars>,
    ) {
    const newCar = await this._service.create(req.body);
    return res.status(HttpCode.CREATE).json(newCar);
  }

  public async find(
    req: Request,
    res: Response<ICars[]>
  ) {

    const cars = await this._service.findAll();
    return res.status(HttpCode.OK).json(cars);
  }

  public async findById(
    req: Request,
    res: Response<ICars>
  ) {
    const { id } = req.params;
    const car = await this._service.findById(id);
    return res.status(HttpCode.OK).json(car);
  }

  public async updatedCar(
    req: Request & { body: ICars },
    res: Response<ICars | null>,
  ) {
      const { id } = req.params;
      const car = req.body;
      const updated = await this._service.updated(id, car);
      return res.status(HttpCode.OK).json(updated);
  }

  public async delete(
    req: Request,
    res: Response<ICars>
  ) {
      const { id } = req.params;
      await this._service.delete(id);
      return res.status(204).end();
  }
}

export default CarController;
