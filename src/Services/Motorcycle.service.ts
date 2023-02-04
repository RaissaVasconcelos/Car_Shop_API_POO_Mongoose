
import MotorcycleODM from '../Model/MotorcycleModel';

class MotorcycleService {
  private motorcycleOdm: MotorcycleODM;

  constructor() {
    this.motorcycleOdm = new MotorcycleODM();
  }

  private motocyrcleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }

    return null;
  }

  public async create(motorcycle: IMotorcycle) {
    const newMotorcycle = await this.motorcycleOdm.create(motorcycle);
    return this.motocyrcleDomain(newMotorcycle);
  }

  public async find() {
    const motorcycles = await this.motorcycleOdm.findAll();
    const arrMotorcycles = motorcycles.map((motorcycle) => this.motocyrcleDomain(motorcycle));
    return arrMotorcycles;
  }

  public async findById(id: string) {
    const motorcycle = await this.motorcycleOdm.findById(id);
    return this.motocyrcleDomain(motorcycle);
  }

  public async update(id: string, update: IMotorcycle) {
    const updated = await this.motorcycleOdm.updated(id, update);
    const result = this.motocyrcleDomain(updated);
    return result;
  }

  public async delete(id: string) {
    return await this.motorcycleOdm.delete(id);
  }
}

export default MotorcycleService;