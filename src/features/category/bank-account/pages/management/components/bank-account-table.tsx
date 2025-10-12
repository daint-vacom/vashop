'use client';

import { useEffect, useMemo, useState } from 'react';
import IBankAccount from '@/features/category/bank-account/models/bank-account.model';
import { useBankAccountTable } from '@/features/category/bank-account/providers/bank-account-table.provider';
import {
  ColumnDef,
  RowSelectionState,
  SortingState,
  Table,
} from '@tanstack/react-table';
import { SquarePen, Trash2 } from 'lucide-react';
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
import { useBankNameColumn } from '../../../hooks/table/use-bank-name-column';

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
        placeholder="Tìm tài khoản..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <DataGridColumnVisibility table={table} />
    </CardToolbar>
  );
}

interface BankAccountTableProps {
  onEdit?: (bank: IBankAccount) => void;
  onDelete?: (bank: IBankAccount) => void;
}

export function BankAccountTable({ onEdit, onDelete }: BankAccountTableProps) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const {
    data,
    total,
    pagination,
    setPagination,
    search,
    setSearch,
    filters,
    setBankFilter,
    sort,
    setSort,
  } = useBankAccountTable();

  useEffect(() => {
    if (sort) {
      setSorting([{ id: sort.selector, desc: sort.desc }]);
    } else {
      setSorting([]);
    }
  }, [sort]);

  // Columns
  const nameColumn = useBankNameColumn<IBankAccount>({
    getBank: (row) => ({
      name: row.name,
      code: row.bankCode,
    }),
    selectedValue: filters['bankCode']?.value,
    onChange: (bank) => setBankFilter(bank?.code),
    enableSorting: true,
  });
  const accNbrColumn = useStringColumn<IBankAccount>({
    getString: (row) => row.accNbr,
    id: 'accNbr',
    headerTitle: 'Số tài khoản',
    enableSorting: true,
  });
  const ownerColumn = useStringColumn<IBankAccount>({
    getString: (row) => row.owner,
    id: 'owner',
    headerTitle: 'Chủ tài khoản',
    enableSorting: true,
  });
  const branchColumn = useStringColumn<IBankAccount>({
    getString: (row) => row.branch || '',
    id: 'branch',
    headerTitle: 'Chi nhánh',
    enableSorting: true,
  });

  const columns = useMemo<ColumnDef<IBankAccount>[]>(
    () => [
      nameColumn,
      accNbrColumn,
      ownerColumn,
      branchColumn,
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex gap-0.5 justify-center">
            <Button
              mode="icon"
              variant="ghost"
              size="table-action"
              title="Xem/Chỉnh sửa"
              onClick={() => onEdit?.(row.original)}
            >
              <SquarePen className="text-green-500" />
            </Button>
            <Button
              mode="icon"
              variant="ghost"
              size="table-action"
              title="Xóa"
              onClick={() => onDelete?.(row.original)}
            >
              <Trash2 className="text-destructive" />
            </Button>
          </div>
        ),
        enableResizing: false,
        size: TableActionSize.buttons(2),
      },
    ],
    [nameColumn, accNbrColumn, ownerColumn, branchColumn, onEdit, onDelete],
  );

  const table = useDefaultTable({
    columns,
    data: data || [],
    getRowId: (row: IBankAccount) => row.id,
    state: {
      rowSelection,
      pagination,
      sorting,
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
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === 'function' ? updater(sorting) : updater;
      setSorting(newSorting);
      const sortValue =
        newSorting.length > 0
          ? { selector: newSorting[0].id, desc: newSorting[0].desc }
          : undefined;
      setSort(sortValue);
    },
  });

  return (
    <DataGrid
      table={table}
      recordCount={total ?? 0}
      tableLayout={{
        columnsPinnable: true,
        columnsResizable: true,
        columnsVisibility: true,
        headerBorder: true,
      }}
    >
      <Card>
        <CardHeader>
          <CardHeading>
            <div className="flex flex-col">
              <span className="table-rows-count">
                Tổng số lượng ngân hàng:{' '}
                <span className="font-medium">{total}</span>
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
