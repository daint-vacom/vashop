'use client';

import { useMemo, useState } from 'react';
import { IOrder } from '@/features/order/models/order.model';
import {
  ColumnDef,
  PaginationState,
  RowSelectionState,
} from '@tanstack/react-table';
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
import { useStringColumn } from '@/components/ui/tables/columns/hooks/use-string-column';
import { TableActionSize } from '@/components/ui/tables/config/table.config';
import { DataGrid } from '@/components/ui/tables/data-grid';
import { DataGridColumnVisibility } from '@/components/ui/tables/data-grid-column-visibility';
import { DataGridPagination } from '@/components/ui/tables/data-grid-pagination';
import { DataGridTable } from '@/components/ui/tables/data-grid-table';
import { useDefaultTable } from '@/components/ui/tables/use-table';

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

export function OrderTable({ data }: { data: IOrder[] }) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Columns
  const idColumn = useStringColumn<IOrder>({
    getString: (row) => row.id,
    id: 'id',
    headerTitle: 'Số phiếu',
  });

  const columns = useMemo<ColumnDef<IOrder>[]>(
    () => [
      idColumn,
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
    [idColumn],
  );

  const table = useDefaultTable({
    columns,
    data: data || [],
    getRowId: (row: IOrder) => row.id,
    state: {
      rowSelection,
      globalFilter: searchQuery,
      pagination,
      columnPinning: {
        right: ['actions'],
      },
    },
    onGlobalFilterChange: setSearchQuery,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
  });

  const filteredRowCount = table.getFilteredRowModel().rows.length;

  return (
    <DataGrid
      table={table}
      recordCount={filteredRowCount}
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
                Số lượng: {filteredRowCount}
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
