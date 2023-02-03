import { model as mongooseCreateModel, Schema } from 'mongoose';
import IMotorcycles from '../interface/IMotorcycles';

import MongoModel from './MongoModel';

const motorcycleMongooseSchema = new Schema<IMotorcycles>({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  status: { type: Boolean, required: true },
  buyValue: { type: Number, required: true },
  category: { type: String, required: true },
  engineCapacity: { type: Number, required: true }, 
});

class MotorcycleModel extends MongoModel<IMotorcycles> {
  constructor(model = mongooseCreateModel('Motorcycle', motorcycleMongooseSchema)) {
    super(model);
    // o nome da coleção será cars
  }
}

export default MotorcycleModel;