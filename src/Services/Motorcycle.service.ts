import IService from '../interface/IService';
import IModel from '../interface/IModel';
import IMotorcycles, { MotorcycleZodSchema } from '../interface/IMotorcycles';

class MotorcyleService implements IService<IMotorcycles> {
  private _motorcycle: IModel<IMotorcycles>;

  constructor(model: IModel<IMotorcycles>) {
    this._motorcycle = model;
  }

  public async create(car: IMotorcycles): Promise<IMotorcycles> {
    const parsed = MotorcycleZodSchema.safeParse(car);

    if (!parsed.success) {
      throw parsed.error;
    }

    return this._motorcycle.create(car);
  }

  public async findAll(): Promise<IMotorcycles[]> {
    return this._motorcycle.findAll();
  }

  public async findById(_id: string): Promise<IMotorcycles> {
    const car = await this._motorcycle.findById(_id);
    if (!car) throw new Error('Car not found')
    return car;
  }

  public async updated(_id: string, motorcycle: IMotorcycles): Promise<IMotorcycles | null> {
    const parsed = MotorcycleZodSchema.safeParse(motorcycle);

    if (!parsed.success) {
      throw parsed.error;
    }

    // valida se o id é válido
    await this.findById(_id);

    return this._motorcycle.updated(_id, motorcycle);
  }

  public async delete(_id: string): Promise<IMotorcycles | null> {
    return this._motorcycle.delete(_id);
  }
}

export default MotorcyleService;