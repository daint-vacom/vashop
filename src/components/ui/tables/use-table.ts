import { useCallback, useEffect, useRef } from 'react';
import {
  getCoreRowModel as defaultGetCoreRowModel,
  FilterFn,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  RowModel,
  Table,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';
import { wrapEmptyCodeString } from '@/lib/codes/data_codes';
import { advancedSearch } from '@/lib/search';

interface DefaultTableOptions<TData>
  extends Omit<TableOptions<TData>, 'getCoreRowModel'> {
  getCoreRowModel?: (table: Table<any>) => () => RowModel<any>;
  filterFns?: {
    multiSelectOr: FilterFn<TData>;
    [key: string]: FilterFn<TData>;
  };
}

// Hook bọc callback để tránh gọi setState sau khi component đã unmount
function useSafeCallback<T extends (...args: any[]) => void>(
  cb?: T,
): T | undefined {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return useCallback(
    ((...args: any[]) => {
      if (mounted.current && cb) {
        cb(...args);
      }
    }) as T,
    [cb],
  );
}

export function useDefaultTable<TData extends RowData>({
  data,
  columns,
  state,
  filterFns,
  onPaginationChange,
  onRowSelectionChange,
  onGlobalFilterChange,
  getCoreRowModel,
  ...options
}: DefaultTableOptions<TData>) {
  return useReactTable<TData>({
    data,
    columns,
    state,
    defaultColumn: {
      size: 200,
      minSize: 50,
      enableResizing: true,
    },
    enableSorting: true,
    enableColumnResizing: true,
    enableRowSelection: !!onRowSelectionChange,
    enableGlobalFilter: !!onGlobalFilterChange,
    globalFilterFn: vietnameseIncludesString,
    filterFns: {
      multiSelectOr,
      vietnameseIncludesString,
      ...filterFns,
    },
    columnResizeMode: 'onChange',
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: useSafeCallback(onPaginationChange),
    onRowSelectionChange: useSafeCallback(onRowSelectionChange),
    onGlobalFilterChange: useSafeCallback(onGlobalFilterChange),
    getCoreRowModel: getCoreRowModel ?? defaultGetCoreRowModel(),
    ...options,
  });
}

export const multiSelectOr: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue || filterValue.length === 0) return true;
  const cellValue = wrapEmptyCodeString(
    row.getValue<string | undefined | null>(columnId),
  );
  return filterValue.some((v: string) => advancedSearch(cellValue, v));
};

export const vietnameseIncludesString: FilterFn<any> = (
  row,
  columnId,
  filterValue,
) => {
  const value = row.getValue<string>(columnId);
  return advancedSearch(value, filterValue);
};
