import { Schema } from 'mongoose';
import AbstractODM from './AbstractODM';
import IMotorcycle from '../Interfaces/IMotorcycle';

class MotorcycleODM extends AbstractODM<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true }, 
    });
    super(schema, 'Motorcycle');
    // o nome da coleção será cars
  }
}

export default MotorcycleODM;