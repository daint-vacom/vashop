import { GetOrderSchemaType } from '../schemas/get-order.schema';

export interface IOrder {
  ordNbr: string;
  ordDate: Date | null;
  cusId: string | null;
  cusCode: string | null;
  cusName: string | null;
  address: string | null;
  tel: string | null;
  buyerIdentityCard: string | null;
  email: string | null;
  description: string | null;
  totalAmountWithoutVat: number | null;
  discountPercenatge: number | null;
  totalDiscount: number | null;
  taxAmount: number | null;
  taxReductionAmount: number | null;
  totalAmount: number | null;
  cusAmount: number | null;
  returnAmount: number | null;
  paymentMethod: string | null;
  orderStatus: string | null;
  invoiceStatus: string | null;
  invoiceNbr: string | null;
  taxCode: string | null;
  companyName: string | null;
  securityNbr: string | null;
  linkCheckInvoice: string | null;
  invoiceType: string | null;
  invoiceId: string | null;
  invoiceDate: Date | null;
  invoiceSymbol: string | null;
  totalVatAmount: number | null;
  orderDetails: any[];
  bankId: string | null;
  voucherCode: string | null;
  warehouseId: string | null;
  voucherOrd: string | null;
  toWarehouseId: string | null;
  isVat: boolean | null;
  refId: string | null;
  refNbr: string | null;
  tenantId: string | null;
  id: string;
  creationTime: Date | null;
  creatorId: string | null;
  lastModificationTime: Date | null;
  lastModifierId: string | null;
}

// Export a helper type if needed for mappers
export type OrderInput = GetOrderSchemaType;
