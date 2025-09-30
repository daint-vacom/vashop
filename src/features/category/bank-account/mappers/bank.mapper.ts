import IBank from '../models/bank.model';
import { GetBankSchemaType } from '../schemas/get-bank-schema';

/**
 * Map validated GetBankSchemaType -> IBank
 * Normalizes undefined to null for nullable fields using `?? null`.
 */
export function getBankMapper(payload: GetBankSchemaType): IBank {
  return {
    code: payload.bankCode,
    name: payload.name,
  };
}

export default getBankMapper;
