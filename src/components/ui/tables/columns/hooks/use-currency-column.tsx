import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { UseTableColumnProps } from '@/components/ui/tables/columns/table-column.config';
import { DataGridColumnHeader } from '@/components/ui/tables/data-grid-column-header';

interface Props<T> extends UseTableColumnProps {
  getCurrency: (row: T) => number | undefined | null;
  renderCell?: (row: number | undefined | null) => React.ReactNode;
}

export function useCurrencyColumn<T>({
  getCurrency,
  id = 'currency',
  headerTitle = 'Currency',
  renderCell = (row) =>
    row?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
}: Props<T>): ColumnDef<T> {
  return useMemo<ColumnDef<T>>(
    () => ({
      id,
      accessorFn: (row) => getCurrency(row),
      header: ({ column }) => (
        <DataGridColumnHeader title={headerTitle} column={column} />
      ),
      cell: ({ row }) => renderCell(getCurrency(row.original)),
      meta: {
        headerTitle,
      },
    }),
    [],
  );
}
