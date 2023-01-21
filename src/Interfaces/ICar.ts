import Vehicle from './IVehicle';

interface ICar extends Vehicle {
  doorsQty: number,
  seatsQty: number,
}

export default ICar;