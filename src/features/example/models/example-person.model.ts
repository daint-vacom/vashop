/**
 * Example feature - Person model
 *
 * Purpose:
 * - Defines the TypeScript interface shape used across the `example` feature.
 * - Serves as a small, fully-typed example of how feature models should be
 *   structured in this repository to help developers and LLMs generate
 *   compatible code.
 *
 * Conventions used here:
 * - Prefix interfaces with `I` when they represent plain data shapes (e.g. `IExamplePerson`).
 * - Use `null` (not `undefined`) for optional nullable fields to keep the
 *   mapping and validation explicit.
 * - Dates are modeled as `Date | null` for runtime Date objects. When
 *   transporting over APIs prefer ISO strings and add explicit conversion
 *   in mappers or serializers.
 *
 * LLM / generator guidance:
 * - When generating new fields, always add them to the Zod schema in
 *   `schemas/`, update mappers in `mappers/`, and then extend this interface.
 * - Keep field names stable and camelCase to match project conventions.
 *
 * Data shape (this is the ground-truth contract used across the UI/backend):
 * {
 *   id: string,
 *   name: string,
 *   age: number,
 *   address: string | null,
 *   dateOfBirth: Date | null,
 * }
 */
interface IExamplePerson {
  id: string;
  name: string;
  age: number;
  address: string | null;
  dateOfBirth: Date | null;
}

export default IExamplePerson;
