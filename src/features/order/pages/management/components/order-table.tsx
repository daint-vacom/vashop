'use client';

import { useMemo, useState } from 'react';
import { IOrder } from '@/features/order/models/order.model';
import { useOrderTable } from '@/features/order/providers/order-table-provider';
import {
  TIME_RANGE_LABELS,
  TIME_RANGES,
  TimeRange,
} from '@/utilities/axios/params/time.param';
import { ColumnDef, RowSelectionState, Table } from '@tanstack/react-table';
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
import { SelectInput } from '@/components/ui/inputs/select-input';
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
// Server-side prop type no longer used; OrderTable reads from context
import { useDefaultTable } from '@/components/ui/tables/use-table';
import { useOrderStatusColumn } from '../hooks/use-order-status-column';

function Toolbar({
  searchQuery,
  setSearchQuery,
  table,
  timeRange,
  setTimeRange,
}: {
  searchQuery: string | undefined;
  setSearchQuery?: (value: string) => void;
  table: Table<IOrder>;
  timeRange?: TimeRange;
  setTimeRange?: (v?: TimeRange) => void;
}) {
  return (
    <CardToolbar>
      <SelectInput
        value={timeRange ?? ''}
        onChange={(v) => setTimeRange && setTimeRange(v as TimeRange)}
        options={Object.values(TIME_RANGES).map((val) => ({
          value: val,
          label: TIME_RANGE_LABELS[val],
        }))}
        className="w-input-md"
        enableSearch={false}
      />
      <SearchInput
        placeholder="Tìm đơn hàng..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
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

export function OrderTable() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const {
    data,
    total,
    pagination,
    setPagination,
    search,
    setSearch,
    timeRange,
    setTimeRange,
  } = useOrderTable();

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
      Math.ceil((total ?? 0) / (pagination?.pageSize ?? 1)),
    ),
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <DataGrid
      table={table}
      recordCount={total ?? 0}
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
                Số lượng đơn hàng: <span className="font-medium">{total}</span>
              </span>
            </div>
          </CardHeading>
          <Toolbar
            searchQuery={search}
            setSearchQuery={setSearch}
            table={table}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
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
