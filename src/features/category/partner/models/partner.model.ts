export interface IPartner {
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
  buyerIdentityCard: string | null;
  email: string | null;
  taxCode: string | null;
  gender: string;
  birthDay: Date | null;
  customerGroupId: string | null;
  isSupplier: boolean | null;
}

export default IPartner;
