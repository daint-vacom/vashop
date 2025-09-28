import { IExamplePerson } from '../models/example-person.model';
import { GetExamplePersonSchemaType } from '../schemas/get-example-person.schema';

/**
 * Mapper: getExamplePersonMapper
 *
 * Purpose:
 * - Convert raw validated schema data (Zod output) into the repository's
 *   runtime model (`IExamplePerson`).
 * - Keep mapping pure and explicit: no side-effects, no network or storage IO.
 *
 * Rules and conventions:
 * - Treat Zod-validated `nullish` fields by normalizing to explicit `null`
 *   where the model expects `null` instead of `undefined`.
 * - Perform any necessary type conversions here (e.g. string -> Date).
 * - Keep mappers simple: if logic grows, extract helper functions and test them.
 *
 * LLM / generator guidance:
 * - When generating mappers, follow the shape of the target `I...` interface
 *   and the source Zod schema type. Use `?? null` to normalize optional fields
 *   to `null` when required by the model.
 * - If adding computed fields, add clear comments and consider moving the
 *   computation to a dedicated utility so tests can target it directly.
 */
export function getExamplePersonMapper(
  schema: GetExamplePersonSchemaType,
): IExamplePerson {
  return {
    id: schema.id,
    name: schema.name,
    age: schema.age,
    // Normalize optional values to explicit null in the runtime model
    address: schema.address ?? null,
    dateOfBirth: schema.dateOfBirth ?? null,
  };
}
