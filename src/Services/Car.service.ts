import ICar from '../Interfaces/ICar';
import Cars from '../Domains/Car';
import CarODM from '../Model/CarODM';

class CarService {
  private carodm: CarODM;

  constructor() {
    this.carodm = new CarODM();
  }

  private carsDomain(car: ICar | null): Cars | null {
    if (car) {
      return new Cars(car);
    }
    return null;
  }

  public async create(car: ICar) {
    const newcar = await this.carodm.create({ ...car, status: car.status || false });
    return this.carsDomain(newcar); 
  }

  public async find() {
    const cars = await this.carodm.findAll();
    const result = cars.map((car) => this.carsDomain(car));
    return result;
  }

  public async findById(id: string) {
    const car = await this.carodm.findById(id);
    return this.carsDomain(car);
  }

  public async updateCar(id: string, updateCar: ICar) {
    const updated = await this.carodm.updated(id, updateCar);
    const result = this.carsDomain(updated);
    return result;
  }

  public async delete(id: string) {
    return await this.carodm.delete(id);
  }
}

export default CarService;