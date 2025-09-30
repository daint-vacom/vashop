'use client';

import { useMemo, useState } from 'react';
import IBankAccount from '@/features/category/bank-account/models/bank-account.model';
import { useBankAccountTable } from '@/features/category/bank-account/providers/bank-account-table.provider';
import { ColumnDef, RowSelectionState, Table } from '@tanstack/react-table';
import { Columns3Cog, SquarePen, Trash2 } from 'lucide-react';
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
  searchQuery: string | undefined;
  setSearchQuery?: (value: string) => void;
  table: Table<IBankAccount>;
}) {
  return (
    <CardToolbar>
      <SearchInput
        placeholder="Tìm ngân hàng..."
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

export function BankAccountTable() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { data, total, pagination, setPagination, search, setSearch } =
    useBankAccountTable();

  // Columns
  const accNbrColumn = useStringColumn<IBankAccount>({
    getString: (row) => row.accNbr,
    id: 'accNbr',
    headerTitle: 'Số tài khoản',
  });
  const nameColumn = useStringColumn<IBankAccount>({
    getString: (row) => row.name,
    id: 'name',
    headerTitle: 'Tên ngân hàng',
  });
  const ownerColumn = useStringColumn<IBankAccount>({
    getString: (row) => row.owner,
    id: 'owner',
    headerTitle: 'Chủ tài khoản',
  });
  const branchColumn = useStringColumn<IBankAccount>({
    getString: (row) => row.branch || '',
    id: 'branch',
    headerTitle: 'Chi nhánh',
  });
  const bankCodeColumn = useStringColumn<IBankAccount>({
    getString: (row) => row.bankCode,
    id: 'bankCode',
    headerTitle: 'Mã ngân hàng',
  });

  const columns = useMemo<ColumnDef<IBankAccount>[]>(
    () => [
      accNbrColumn,
      nameColumn,
      ownerColumn,
      branchColumn,
      bankCodeColumn,
      {
        id: 'actions',
        header: '',
        cell: () => (
          <div className="flex gap-0.5 justify-center">
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
        size: TableActionSize.buttons(2),
      },
    ],
    [accNbrColumn, nameColumn, ownerColumn, branchColumn, bankCodeColumn],
  );

  const table = useDefaultTable({
    columns,
    data: data || [],
    getRowId: (row: IBankAccount) => row.id,
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
                Số lượng ngân hàng: <span className="font-medium">{total}</span>
              </span>
            </div>
          </CardHeading>
          <Toolbar
            searchQuery={search}
            setSearchQuery={setSearch}
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
