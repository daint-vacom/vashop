import React, { createContext, useContext } from 'react';
import {
  ApiRequestOption,
  ApiResponseWithPagination,
} from '@/utilities/axios/types';
import { useServerTable } from '@/components/ui/tables/use-server-table';
import IEmployee from '../models/employee.model';
import { getEmployeeListApi } from '../services/employee.service';

type EmployeeTableContextValue = ReturnType<
  typeof useLocalEmployeeTable
> | null;

type Fetcher = (
  opts?: ApiRequestOption,
) => Promise<ApiResponseWithPagination<IEmployee>>;

type UseEmployeeTableOptions = Parameters<
  typeof useServerTable<IEmployee, unknown>
>[1];

function useLocalEmployeeTable(
  fetcher: Fetcher,
  options?: UseEmployeeTableOptions,
) {
  const {
    pagination,
    setPagination,
    search,
    setSearch,
    apiOptions,
    data,
    total,
    isLoading,
    query,
  } = useServerTable<IEmployee, unknown>(fetcher, options);

  return {
    pagination,
    setPagination,
    search,
    setSearch,
    apiOptions,
    data,
    total,
    isLoading,
    query,
  } as const;
}

const EmployeeTableContext = createContext<EmployeeTableContextValue>(null);

export function EmployeeTableProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useLocalEmployeeTable(getEmployeeListApi, {
    defaultPageSize: 5,
    queryKeyBase: 'employees',
    syncWithUrl: true,
  });

  return (
    <EmployeeTableContext.Provider value={value}>
      {children}
    </EmployeeTableContext.Provider>
  );
}

export function useEmployeeTable() {
  const ctx = useContext(EmployeeTableContext);
  if (!ctx) {
    throw new Error(
      'useEmployeeTable must be used within a EmployeeTableProvider',
    );
  }
  return ctx;
}
