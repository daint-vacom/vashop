import IBankAccount from '../models/bank-account.model';
import { GetBankAccountSchemaType } from '../schemas/get-bank-account.schema';

/**
 * Map validated GetBankAccountSchemaType -> IBankAccount
 * Normalizes undefined to null for nullable fields using `?? null`.
 */
export function getBankAccountMapper(
  payload: GetBankAccountSchemaType,
): IBankAccount {
  return {
    id: payload.id,
    creationTime: payload.creationTime,
    creatorId: payload.creatorId,
    lastModificationTime: payload.lastModificationTime,
    lastModifierId: payload.lastModifierId,
    tenantId: payload.tenantId,
    accNbr: payload.accNbr,
    name: payload.name,
    owner: payload.owner,
    branch: payload.branch,
    bankCode: payload.bankCode,
  };
}

export default getBankAccountMapper;
