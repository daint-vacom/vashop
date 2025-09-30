'use client';

import { useMemo, useState } from 'react';
import IEmployee from '@/features/category/employee/models/employee.model';
import { useEmployeeTable } from '@/features/category/employee/providers/employee-table.provider';
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
  table: Table<IEmployee>;
}) {
  return (
    <CardToolbar>
      <SearchInput
        placeholder="Tìm nhân viên..."
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

export function EmployeeTable() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { data, total, pagination, setPagination, search, setSearch } =
    useEmployeeTable();

  // Columns
  const codeColumn = useStringColumn<IEmployee>({
    getString: (row) => row.code,
    id: 'code',
    headerTitle: 'Mã nhân viên',
  });
  const nameColumn = useStringColumn<IEmployee>({
    getString: (row) => row.name,
    id: 'name',
    headerTitle: 'Tên nhân viên',
  });
  const addressColumn = useStringColumn<IEmployee>({
    getString: (row) => row.address || '',
    id: 'address',
    headerTitle: 'Địa chỉ',
  });
  const telColumn = useStringColumn<IEmployee>({
    getString: (row) => row.tel || '',
    id: 'tel',
    headerTitle: 'Số điện thoại',
  });
  const emailColumn = useStringColumn<IEmployee>({
    getString: (row) => row.email || '',
    id: 'email',
    headerTitle: 'Email',
  });
  const departmentColumn = useStringColumn<IEmployee>({
    getString: (row) => row.departmentId,
    id: 'department',
    headerTitle: 'Phòng ban',
  });
  const birthDayColumn = useStringColumn<IEmployee>({
    getString: (row) => (row.birthDay ? row.birthDay.toLocaleDateString() : ''),
    id: 'birthDay',
    headerTitle: 'Ngày sinh',
  });

  const columns = useMemo<ColumnDef<IEmployee>[]>(
    () => [
      codeColumn,
      nameColumn,
      addressColumn,
      telColumn,
      emailColumn,
      departmentColumn,
      birthDayColumn,
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
    [
      codeColumn,
      nameColumn,
      addressColumn,
      telColumn,
      emailColumn,
      departmentColumn,
      birthDayColumn,
    ],
  );

  const table = useDefaultTable({
    columns,
    data: data || [],
    getRowId: (row: IEmployee) => row.id,
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
                Số lượng nhân viên: <span className="font-medium">{total}</span>
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
