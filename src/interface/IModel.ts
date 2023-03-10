export default interface IModel<T> {
  create(obj: T): Promise<T>,
  findAll(): Promise<T[]>,
  findById(_id: string): Promise<T | null>,
  updated(_id: string, update: Partial<T>): Promise<T | null>,
  delete(_id: string): Promise<T | null>,
};
