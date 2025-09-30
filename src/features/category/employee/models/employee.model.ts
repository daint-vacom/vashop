export interface IEmployee {
  id: string;
  creationTime: Date;
  creatorId: string;
  lastModificationTime: Date | null;
  lastModifierId: string | null;
  tenantId: string;
  code: string;
  name: string;
  address: string | null;
  tel: string | null;
  email: string | null;
  departmentId: string;
  birthDay: Date | null;
}

export default IEmployee;
