import { PaymentMethod } from '@/lib/enums/payment-method.enum';
import { OrderStatus } from '../enums/order-status.enum';

export interface IOrder {
  ordNbr: string; // Số phiếu
  ordDate: Date | null;
  cusId: string | null;
  cusCode: string | null;
  cusName: string | null; // Khách hàng
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
  totalAmount: number | null; // Tổng tiền
  cusAmount: number | null;
  returnAmount: number | null;
  paymentMethod: PaymentMethod | null; // Hình thức thanh toán
  orderStatus: OrderStatus | null; // Trạng thái
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
  refNbr: string | null; // Số chứng từ tham chiếu
  tenantId: string | null;
  id: string;
  creationTime: Date | null; // Ngày tạo
  creatorId: string | null;
  lastModificationTime: Date | null;
  lastModifierId: string | null;
}
