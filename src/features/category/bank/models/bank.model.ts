export interface IBankAccount {
  id: string;
  creationTime: Date;
  creatorId: string;
  lastModificationTime: Date | null;
  lastModifierId: string | null;
  tenantId: string;
  accNbr: string;
  name: string;
  owner: string;
  branch: string | null;
  bankCode: string;
}

export default IBankAccount;
