import { z } from 'zod';

/**
 * Zod schema: getExamplePersonSchema
 *
 * Purpose:
 * - Defines the validation rules for incoming or persisted data that will be
 *   mapped to `IExamplePerson` using `mappers/get-example-person.mapper.ts`.
 *
 * Conventions:
 * - Use `nullish()` when a field should accept `null` or `undefined` from
 *   external input; mappers normalize to `null` for the runtime model.
 * - Keep schema fields minimal and explicit. If a field needs custom parsing
 *   (e.g. date strings), handle parsing/leisure in a mapper or a parsing utility.
 *
 * LLM / generator guidance:
 * - When generating new schemas, mirror the runtime model names and types.
 * - For fields that will be dates in the runtime model, prefer `z.date()` and
 *   ensure the parser upstream converts ISO strings to Date objects before
 *   validating, or add a `preprocess` step on the schema.
 */
export const getExamplePersonSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
  // Accept null/undefined from input; mapper will normalize to null
  address: z.string().nullish(),
  dateOfBirth: z.date().nullish(),
});

export type GetExamplePersonSchemaType = z.infer<typeof getExamplePersonSchema>;
