import { dateSchema } from '@/schemas/types/date.schema';
import { stringSchema } from '@/schemas/types/string.schema';
import z from 'zod';

export const editOrderSchema = z.object({
  test: stringSchema(),
  date: dateSchema(),
});

export type EditOrderSchemaType = z.infer<typeof editOrderSchema>;
