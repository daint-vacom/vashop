import { z } from 'zod';

export const getBankAccountSchema = z.object({
  id: z.string(),
  creationTime: z.date(),
  creatorId: z.string(),
  lastModificationTime: z.date().nullable(),
  lastModifierId: z.string().nullable(),
  tenantId: z.string(),
  accNbr: z.string(),
  name: z.string(),
  owner: z.string(),
  branch: z.string().nullable(),
  bankCode: z.string(),
});

export type GetBankAccountSchemaType = z.infer<typeof getBankAccountSchema>;
