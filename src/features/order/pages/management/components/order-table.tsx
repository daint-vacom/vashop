'use client';

import { useMemo, useState } from 'react';
import { IOrder } from '@/features/order/models/order.model';
import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import {
  Columns3Cog,
  FileText,
  Printer,
  SquarePen,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardFooter,
  CardHeader,
  CardHeading,
  CardTable,
  CardToolbar,
} from '@/components/ui/card';
import { SearchInput } from '@/components/ui/inputs/search-input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useCurrencyColumn } from '@/components/ui/tables/columns/hooks/use-currency-column';
import { useDateColumn } from '@/components/ui/tables/columns/hooks/use-date-column';
import { useNumberColumn } from '@/components/ui/tables/columns/hooks/use-number-column';
import { useStringColumn } from '@/components/ui/tables/columns/hooks/use-string-column';
import { TableActionSize } from '@/components/ui/tables/config/table.config';
import { DataGrid } from '@/components/ui/tables/data-grid';
import { DataGridColumnVisibility } from '@/components/ui/tables/data-grid-column-visibility';
import { DataGridPagination } from '@/components/ui/tables/data-grid-pagination';
import { DataGridTable } from '@/components/ui/tables/data-grid-table';
import { ServerSideTableProps } from '@/components/ui/tables/types/server-side-table-prop';
import { useDefaultTable } from '@/components/ui/tables/use-table';
import { useOrderStatusColumn } from '../hooks/use-order-status-column';

function Toolbar({
  searchQuery,
  setSearchQuery,
  table,
}: {
  searchQuery: string | undefined;
  setSearchQuery?: (value: string) => void;
  table: any;
}) {
  return (
    <CardToolbar>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <DataGridColumnVisibility
        table={table}
        trigger={
          <Button variant="outline">
            <Columns3Cog />
            Cột
          </Button>
        }
      />
    </CardToolbar>
  );
}

export function OrderTable({
  data,
  totalCount,
  pagination,
  onPaginationChange,
  search: searchValue,
  onSearchChange,
}: ServerSideTableProps<IOrder>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // Columns
  const orderNumberColumn = useStringColumn<IOrder>({
    getString: (row) => row.ordNbr,
    id: 'order-number',
    headerTitle: 'Số phiếu',
  });
  const refNumberColumn = useStringColumn<IOrder>({
    getString: (row) => row.refNbr,
    id: 'ref-number',
    headerTitle: 'Số chứng từ tham chiếu',
  });
  const customerColumn = useStringColumn<IOrder>({
    getString: (row) => row.cusName,
    id: 'customer',
    headerTitle: 'Khách hàng',
  });
  const createdDateColumn = useDateColumn<IOrder>({
    getDate: (row) => row.creationTime,
    id: 'created-date',
    headerTitle: 'Ngày tạo',
  });
  const totalQuantityColumn = useNumberColumn<IOrder>({
    getNumber: (row) => row.totalAmount,
    id: 'total-quantity',
    headerTitle: 'Tổng số lượng',
  });
  const totalAmountColumn = useCurrencyColumn<IOrder>({
    getCurrency: (row) => row.totalAmount,
    id: 'total-amount',
    headerTitle: 'Tổng tiền',
  });
  const statusColumn = useOrderStatusColumn<IOrder>((row) => row.orderStatus);
  const paymentMethodColumn = useStringColumn<IOrder>({
    getString: (row) => row.paymentMethod,
    id: 'payment-method',
    headerTitle: 'Hình thức thanh toán',
  });

  const columns = useMemo<ColumnDef<IOrder>[]>(
    () => [
      orderNumberColumn,
      refNumberColumn,
      customerColumn,
      createdDateColumn,
      totalQuantityColumn,
      totalAmountColumn,
      statusColumn,
      paymentMethodColumn,
      {
        id: 'actions',
        header: '',
        cell: () => (
          <div className="flex gap-0.5 justify-center">
            <Button
              mode="icon"
              variant="ghost"
              size="table-action"
              title="In hóa đơn"
            >
              <Printer className="text-blue-500" />
            </Button>
            <Button
              mode="icon"
              variant="ghost"
              size="table-action"
              title="Xuất hóa đơn điện tử"
            >
              <FileText className="text-purple-500" />
            </Button>
            <Button
              mode="icon"
              variant="ghost"
              size="table-action"
              title="Xem/Chỉnh sửa"
            >
              <SquarePen className="text-green-500" />
            </Button>
            <Button mode="icon" variant="ghost" size="table-action" title="Xóa">
              <Trash2 className="text-destructive" />
            </Button>
          </div>
        ),
        enableResizing: false,
        size: TableActionSize.buttons(4),
      },
    ],
    [
      orderNumberColumn,
      refNumberColumn,
      customerColumn,
      createdDateColumn,
      totalQuantityColumn,
      totalAmountColumn,
      statusColumn,
      paymentMethodColumn,
    ],
  );

  const table = useDefaultTable({
    columns,
    data: data || [],
    getRowId: (row: IOrder) => row.id,
    state: {
      rowSelection,
      pagination,
      columnPinning: {
        right: ['actions'],
      },
    },
    manualPagination: true,
    pageCount: Math.max(
      0,
      Math.ceil((totalCount ?? 0) / (pagination?.pageSize ?? 1)),
    ),
    onPaginationChange: onPaginationChange,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <DataGrid
      table={table}
      recordCount={totalCount ?? 0}
      tableLayout={{
        columnsPinnable: true,
        columnsResizable: true,
        columnsVisibility: true,
        cellBorder: true,
      }}
    >
      <Card>
        <CardHeader>
          <CardHeading>
            <div className="flex flex-col">
              <span className="table-rows-count">
                Số lượng đơn hàng:{' '}
                <span className="font-medium">{totalCount}</span>
              </span>
            </div>
          </CardHeading>
          <Toolbar
            searchQuery={searchValue}
            setSearchQuery={onSearchChange}
            table={table}
          />
        </CardHeader>
        <CardTable>
          <ScrollArea>
            <DataGridTable />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardTable>
        <CardFooter>
          <DataGridPagination />
        </CardFooter>
      </Card>
    </DataGrid>
  );
}
