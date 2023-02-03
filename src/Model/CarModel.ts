

import { model as mongooseCreateModel, Schema } from 'mongoose';
import ICars from '../interface/ICars';
import MongoModel from './MongoModel';

const carMongooseSchema = new Schema<ICars>({
    model: String,
    year: Number,
    color: String,
    status: Boolean,
    buyValue: Number,
    doorsQty: Number,
    seatsQty: Number, 
})

class CarModel extends MongoModel<ICars> {
  constructor(model = mongooseCreateModel('Car', carMongooseSchema)) {
    super(model);
  }
}

export default CarModel;
