import { useMemo } from 'react';
import { OrderStatusBadge } from '@/features/order/components/order-status-badge';
import {
  ORDER_STATUS_LABELS,
  OrderStatus,
} from '@/features/order/enums/order-status.enum';
import { ColumnDef } from '@tanstack/react-table';
import { DataGridColumnHeader } from '@/components/ui/tables/data-grid-column-header';

export function useOrderStatusColumn<T>(
  getOrderStatus: (row: T) => OrderStatus | null,
): ColumnDef<T> {
  return useMemo<ColumnDef<T>>(
    () => ({
      id: 'status',
      accessorFn: (row) =>
        getOrderStatus(row) && ORDER_STATUS_LABELS[getOrderStatus(row)!],
      header: ({ column }) => (
        <DataGridColumnHeader title="Trạng thái" column={column} />
      ),
      cell: ({ row }) => (
        <OrderStatusBadge status={getOrderStatus(row.original)} />
      ),
      meta: {
        headerTitle: 'Trạng thái',
      },
    }),
    [],
  );
}
