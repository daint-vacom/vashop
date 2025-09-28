'use client';

import { useMemo, useState } from 'react';
import { IOrder } from '@/features/order/models/order.model';
import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { Columns3Cog, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardFooter,
  CardHeader,
  CardHeading,
  CardTable,
  CardToolbar,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
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
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  table: any;
}) {
  return (
    <CardToolbar>
      <div className="relative">
        <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
        <Input
          placeholder="Tìm phòng ban..."
          value={searchQuery}
          onChange={(val) => setSearchQuery(val ?? '')}
          className="ps-9 w-40"
        />
        {searchQuery.length > 0 && (
          <Button
            mode="icon"
            variant="ghost"
            className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
            onClick={() => setSearchQuery('')}
          >
            <X />
          </Button>
        )}
      </div>
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
}: ServerSideTableProps<IOrder>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [searchQuery, setSearchQuery] = useState('');

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
  const totalAmountColumn = useNumberColumn<IOrder>({
    getNumber: (row) => row.totalAmount,
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
        cell: ({ row }) => null,
        enableResizing: false,
        size: TableActionSize.buttons(4),
        meta: {
          headerClassName: '',
        },
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
                Tổng số lượng: {totalCount}
              </span>
            </div>
          </CardHeading>
          <Toolbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
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
