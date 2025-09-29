import { Badge } from '@/components/ui/badge';
import {
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  OrderStatus,
} from '../enums/order-status.enum';

interface Props {
  status: OrderStatus | null;
}

export function OrderStatusBadge({ status }: Props) {
  const variant = () => {
    switch (status) {
      case ORDER_STATUS.DRAFT:
      case ORDER_STATUS.WAITING_FOR_PAYMENT:
        return 'warning';
      case ORDER_STATUS.PAID:
      case ORDER_STATUS.FINISHED:
        return 'success';
      default:
        return 'outline';
    }
  };

  if (!status) return null;

  return (
    <Badge variant={variant()} appearance="outline" size="lg" shape="circle">
      {ORDER_STATUS_LABELS[status]}
    </Badge>
  );
}
