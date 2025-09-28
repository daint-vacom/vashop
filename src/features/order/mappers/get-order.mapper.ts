import { IOrder } from '../models/order.model';
import { GetOrderSchemaType } from '../schemas/get-order.schema';

function parseDateOrNull(value: unknown): Date | null {
  if (!value && value !== 0) return null;
  const s = String(value);
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function getOrderMapper(input: GetOrderSchemaType): IOrder {
  return {
    ordNbr: input.ordNbr,
    ordDate: parseDateOrNull(input.ordDate),
    cusId: input.cusId ?? null,
    cusCode: input.cusCode ?? null,
    cusName: input.cusName ?? null,
    address: input.address ?? null,
    tel: input.tel ?? null,
    buyerIdentityCard: input.buyerIdentityCard ?? null,
    email: input.email ?? null,
    description: input.description ?? null,
    totalAmountWithoutVat: input.totalAmountWithoutVat ?? null,
    discountPercenatge: input.discountPercenatge ?? null,
    totalDiscount: input.totalDiscount ?? null,
    taxAmount: input.taxAmount ?? null,
    taxReductionAmount: input.taxReductionAmount ?? null,
    totalAmount: input.totalAmount ?? null,
    cusAmount: input.cusAmount ?? null,
    returnAmount: input.returnAmount ?? null,
    paymentMethod: input.paymentMethod ?? null,
    orderStatus: input.orderStatus ?? null,
    invoiceStatus: input.invoiceStatus ?? null,
    invoiceNbr: input.invoiceNbr ?? null,
    taxCode: input.taxCode ?? null,
    companyName: input.companyName ?? null,
    securityNbr: input.securityNbr ?? null,
    linkCheckInvoice: input.linkCheckInvoice ?? null,
    invoiceType: input.invoiceType ?? null,
    invoiceId: input.invoiceId ?? null,
    invoiceDate: parseDateOrNull(input.invoiceDate),
    invoiceSymbol: input.invoiceSymbol ?? null,
    totalVatAmount: input.totalVatAmount ?? null,
    orderDetails: Array.isArray(input.orderDetails) ? input.orderDetails : [],
    bankId: input.bankId ?? null,
    voucherCode: input.voucherCode ?? null,
    warehouseId: input.warehouseId ?? null,
    voucherOrd: input.voucherOrd ?? null,
    toWarehouseId: input.toWarehouseId ?? null,
    isVat: input.isVat ?? null,
    refId: input.refId ?? null,
    refNbr: input.refNbr ?? null,
    tenantId: input.tenantId ?? null,
    id: input.id,
    creationTime: parseDateOrNull(input.creationTime),
    creatorId: input.creatorId ?? null,
    lastModificationTime: parseDateOrNull(input.lastModificationTime),
    lastModifierId: input.lastModifierId ?? null,
  };
}

export default getOrderMapper;
