import IEmployee from '../models/employee.model';
import { GetEmployeeSchemaType } from '../schemas/get-employee.schema';

/**
 * Map validated GetEmployeeSchemaType -> IEmployee
 * Normalizes undefined to null for nullable fields using `?? null`.
 */
export function getEmployeeMapper(payload: GetEmployeeSchemaType): IEmployee {
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
    email: payload.email,
    departmentId: payload.departmentId,
    birthDay: payload.birthDay,
  };
}

export default getEmployeeMapper;
