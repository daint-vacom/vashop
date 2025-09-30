import { stringSchema } from '@/schemas/types/string.schema';
import { z } from 'zod';

export const editBankAccountSchema = z.object({
  accNbr: stringSchema(),
  name: stringSchema(),
  owner: stringSchema(),
  branch: stringSchema().nullish(),
  bankCode: stringSchema(),
});

export type EditBankAccountSchemaType = z.infer<typeof editBankAccountSchema>;
