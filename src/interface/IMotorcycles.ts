import { z } from 'zod';

const MotorcycleZodSchema = z.object({
  _id: z.string(),
  model: z.string(),
  year: z.number(),
  color: z.string(),
  status: z.boolean(),
  buyValue: z.number(),
  doorsQty: z.number(),
  category: z.string(),
  engineCapacity: z.number(),
});

type IMotorcycles = z.infer<typeof MotorcycleZodSchema>;

export default IMotorcycles;
export { MotorcycleZodSchema }
