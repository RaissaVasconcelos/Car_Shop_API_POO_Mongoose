import Vehicle from './IVehicle';

interface IMotorcycle extends Vehicle {
  category: string;
  engineCapacity: number;
}

export default IMotorcycle;