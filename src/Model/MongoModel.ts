import { Model, isValidObjectId, UpdateQuery } from 'mongoose';
import IModel from '../interface/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async findAll(): Promise<T[]> {
    return this._model.find();
  }

  public async findById(_id: string): Promise<T | null > {
    if (!isValidObjectId(_id)) throw new Error('Invalid idMongo!');
    
    return this._model.findOne({ _id });
  }

  public async updated(_id: string, update: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error('Invalid idMongo!');

    return this._model.findByIdAndUpdate(
      { _id },
      { ...update } as UpdateQuery<T>,
      { new: true },
    );
  }

  public async delete(_id: string) {
    if (!isValidObjectId(_id)) throw new Error('Invalid idMongo!');
    return this._model.findByIdAndDelete({ _id });
  } 
}

export default MongoModel;
