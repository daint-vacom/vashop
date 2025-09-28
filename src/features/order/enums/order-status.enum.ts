export const ORDER_STATUS = {
  PAID: 'paid',
  FINISHED: 'finished',
  WAITING_FOR_PAYMENT: 'awaitingpayment',
  DRAFT: 'lưu tạm',
  CANCELLED: 'cancelled',
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [ORDER_STATUS.PAID]: 'Hoàn thành',
  [ORDER_STATUS.FINISHED]: 'Hoàn thành',
  [ORDER_STATUS.WAITING_FOR_PAYMENT]: 'Lưu tạm',
  [ORDER_STATUS.DRAFT]: 'Lưu tạm',
  [ORDER_STATUS.CANCELLED]: 'Đã Hủy',
};
