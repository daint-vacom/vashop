import { z } from 'zod';

export const getCustomerSchema = z.object({
  id: z.string(),
  creationTime: z.date(),
  creatorId: z.string(),
  lastModificationTime: z.date().nullable(),
  lastModifierId: z.string().nullable(),
  tenantId: z.string(),
  code: z.string(),
  name: z.string(),
  address: z.string().nullable(),
  tel: z.string().nullable(),
  buyerIdentityCard: z.string().nullable(),
  email: z.string().nullable(),
  taxCode: z.string().nullable(),
  gender: z.string(),
  birthDay: z.date().nullable(),
  customerGroupId: z.string().nullable(),
  isSupplier: z.boolean().nullable(),
});

export type GetCustomerSchemaType = z.infer<typeof getCustomerSchema>;
