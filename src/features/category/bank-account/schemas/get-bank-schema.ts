import { z } from 'zod';

export const getBankSchema = z.object({
  bankCode: z.string(),
  name: z.string(),
});

export type GetBankSchemaType = z.infer<typeof getBankSchema>;
