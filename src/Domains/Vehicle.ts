import IVehicle from '../Interfaces/IVehicle';

export default class Vehicle {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean | undefined;
  protected buyValue: number;

  constructor(model: IVehicle) {
    this.id = model.id;
    this.model = model.model;
    this.year = model.year;
    this.status = model.status;
    this.color = model.color;
    this.buyValue = model.buyValue;
  }

  getModel(): string {
    return this.model;
  }

  getYear(): number {
    return this.year;
  }

  getColor(): string {
    return this.color;
  }

  getStatus(): boolean | undefined {
    return this.status;
  }

  getBuyValue(): number {
    return this.buyValue;
  }
}