import z from 'zod';
import { SCHEMA_MESSAGES } from '../messages/schema-messages';

export interface NumberSchemaOptions {
  required?: boolean;
  message?: string;
  min?: number;
  max?: number;
  minMessage?: (min: number) => string;
  maxMessage?: (max: number) => string;
}

export const numberSchema = ({
  required = true,
  message = SCHEMA_MESSAGES.REQUIRED,
  min,
  max,
  minMessage = SCHEMA_MESSAGES.MIN_VALUE,
  maxMessage = SCHEMA_MESSAGES.MAX_VALUE,
}: NumberSchemaOptions = {}) => {
  let schema = z.coerce.number({
    required_error: message,
    invalid_type_error: message,
    message,
  });
  if (min) schema = schema.min(min, { message: minMessage(min) });
  else if (required) schema = schema.min(1, { message: message });
  if (max) schema = schema.max(max, { message: maxMessage(max) });

  return schema;
};
