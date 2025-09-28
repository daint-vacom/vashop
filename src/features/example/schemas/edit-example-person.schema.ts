import { numberSchema } from '@/schemas/types/number.schema';
import { stringSchema } from '@/schemas/types/string.schema';
import { z } from 'zod';

/**
 * Zod schema: editExamplePersonSchema
 *
 * Purpose:
 * - Validation schema for edits (create/update) of ExamplePerson.
 * - Uses shared `stringSchema`/`numberSchema` helpers to enforce project-wide
 *   string/number rules (length, trimming, min/max, etc.).
 *
 * Conventions:
 * - Use shared schema helpers from `@/schemas/types/*` to keep validation
 *   consistent across features.
 * - Use `.nullish()` for optional fields that may be omitted on edit.
 * - Prefer `numberSchema({ min, max })` helpers for numeric constraints so
 *   error messages are consistent.
 *
 * LLM / generator guidance:
 * - When generating new edit schemas, reuse the project's `*Schema` helpers.
 * - Keep user-facing validation messages in a central place if available so
 *   LLMs can reuse those message templates.
 */
export const editExamplePersonSchema = z.object({
  name: stringSchema(),
  age: numberSchema({ min: 0 }),
  // Optional address for edits; will be normalized by mappers if needed.
  address: stringSchema().nullish(),
  dateOfBirth: z.date().nullish(),
});

export type EditExamplePersonSchemaType = z.infer<
  typeof editExamplePersonSchema
>;
