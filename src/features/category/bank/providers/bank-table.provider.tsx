import React, { createContext, useContext } from 'react';
import {
  ApiRequestOption,
  ApiResponseWithPagination,
} from '@/utilities/axios/types';
import { useServerTable } from '@/components/ui/tables/use-server-table';
import IBankAccount from '../models/bank.model';
import { getBankAccountListApi } from '../services/bank.service';

type BankAccountTableContextValue = ReturnType<
  typeof useLocalBankAccountTable
> | null;

type Fetcher = (
  opts?: ApiRequestOption,
) => Promise<ApiResponseWithPagination<IBankAccount>>;

type UseBankAccountTableOptions = Parameters<
  typeof useServerTable<IBankAccount, unknown>
>[1];

function useLocalBankAccountTable(
  fetcher: Fetcher,
  options?: UseBankAccountTableOptions,
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
  } = useServerTable<IBankAccount, unknown>(fetcher, options);

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

const BankAccountTableContext =
  createContext<BankAccountTableContextValue>(null);

export function BankAccountTableProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useLocalBankAccountTable(getBankAccountListApi, {
    defaultPageSize: 5,
    queryKeyBase: 'banks',
    syncWithUrl: true,
  });

  return (
    <BankAccountTableContext.Provider value={value}>
      {children}
    </BankAccountTableContext.Provider>
  );
}

export function useBankAccountTable() {
  const ctx = useContext(BankAccountTableContext);
  if (!ctx) {
    throw new Error(
      'useBankAccountTable must be used within a BankAccountTableProvider',
    );
  }
  return ctx;
}
