import z from 'zod';
import { SCHEMA_MESSAGES } from '../messages/schema-messages';

export interface StringSchemaOptions {
  required?: boolean;
  message?: string;
  minLength?: number;
  maxLength?: number;
  minLengthMessage?: (min: number) => string;
  maxLengthMessage?: (max: number) => string;
}

export const stringSchema = ({
  required = true,
  message = SCHEMA_MESSAGES.REQUIRED,
  minLength,
  maxLength,
  minLengthMessage = SCHEMA_MESSAGES.MIN_LENGTH,
  maxLengthMessage = SCHEMA_MESSAGES.MAX_LENGTH,
}: StringSchemaOptions = {}) => {
  let schema = z.string({
    required_error: message,
    invalid_type_error: message,
    message,
  });
  if (minLength)
    schema = schema.min(minLength, { message: minLengthMessage(minLength) });
  else if (required) schema = schema.min(1, { message: message });
  if (maxLength)
    schema = schema.max(maxLength, { message: maxLengthMessage(maxLength) });

  return schema;
};
