import ICustomer from '../models/customer.model';
import { GetCustomerSchemaType } from '../schemas/get-customer.schema';

/**
 * Map validated GetCustomerSchemaType -> ICustomer
 * Normalizes undefined to null for nullable fields using `?? null`.
 */
export function getCustomerMapper(payload: GetCustomerSchemaType): ICustomer {
  return {
    id: payload.id,
    creationTime: payload.creationTime,
    creatorId: payload.creatorId,
    lastModificationTime: payload.lastModificationTime,
    lastModifierId: payload.lastModifierId,
    tenantId: payload.tenantId,
    code: payload.code,
    name: payload.name,
    address: payload.address,
    tel: payload.tel,
    buyerIdentityCard: payload.buyerIdentityCard,
    email: payload.email,
    taxCode: payload.taxCode,
    gender: payload.gender,
    birthDay: payload.birthDay,
    customerGroupId: payload.customerGroupId,
    isSupplier: payload.isSupplier,
  };
}

export default getCustomerMapper;
