import { z } from 'zod';

export const getEmployeeSchema = z.object({
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
  email: z.string().nullable(),
  departmentId: z.string(),
  birthDay: z.date().nullable(),
});

export type GetEmployeeSchemaType = z.infer<typeof getEmployeeSchema>;
