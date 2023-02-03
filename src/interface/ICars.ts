import { z } from 'zod';

const CarsZodSchema = z.object({
  model: z.string(),
  year: z.number(),
  color: z.string(),
  status: z.boolean(),
  buyValue: z.number(),
  doorsQty: z.number(),
  seatsQty: z.number(),
});

type ICars = z.infer<typeof CarsZodSchema>;

export default ICars;
export { CarsZodSchema }