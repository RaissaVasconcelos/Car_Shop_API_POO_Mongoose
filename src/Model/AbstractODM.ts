import { Model, models, Schema, model } from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async findAll(): Promise<T[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<T | null > {
    return this.model.findById(id);
  }

  public async updated(id: string, update: Partial<T>) {
    const result = this.model.findByIdAndUpdate(
      { _id: id },
      { ...update },
      { new: true },
    );
    return result;
  }

  public async delete(id: string) {
    return this.model.findByIdAndDelete(id);
  } 
}

export default AbstractODM;
