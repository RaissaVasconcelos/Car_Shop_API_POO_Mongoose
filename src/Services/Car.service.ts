import IService from '../interface/IService';
import ICars, { CarsZodSchema } from '../interface/ICars';
import IModel from '../interface/IModel';

class CarService implements IService<ICars> {
  private _car: IModel<ICars>;

  constructor(model: IModel<ICars>) {
    this._car = model;
  }

  public async create(car: ICars): Promise<ICars> {
    // If you don't want Zod to throw errors when validation fails, use .safeParse. 
    // This method returns an object containing either the successfully parsed data 
    // or a ZodError instance containing detailed information about the validation problems
    const parsed = CarsZodSchema.safeParse(car);

    if (!parsed.success) {
      throw parsed.error;
    }

    return this._car.create(car);
  }

  public async findAll(): Promise<ICars[]> {
    return this._car.findAll()
  }

  public async findById(_id: string): Promise<ICars> {
    const car = await this._car.findById(_id);
    if (!car) throw new Error('Car not found')
    return car;
  }

  public async updated(_id: string, updateCar: ICars): Promise<ICars | null> {
    const parsed = CarsZodSchema.safeParse(updateCar);

    if (!parsed.success) {
      throw parsed.error;
    }

    // valida se o id é válido
    await this.findById(_id);

    return this._car.updated(_id, updateCar);
  }

  public async delete(_id: string): Promise<ICars | null> {
    return this._car.delete(_id);
  }
}

export default CarService;
