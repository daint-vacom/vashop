import React, { createContext, useContext } from 'react';
import {
  ApiRequestOption,
  ApiResponseWithPagination,
} from '@/utilities/axios/types';
import { useApiPagination } from '@/hooks/queries/use-api-pagination';
import IPartner from '../models/partner.model';
import { getParnerListApi } from '../services/partner.service';

type PartnerTableContextValue = ReturnType<typeof useLocalPartnerTable> | null;

type Fetcher = (
  opts?: ApiRequestOption,
) => Promise<ApiResponseWithPagination<IPartner>>;

type UsePartnerTableOptions = Parameters<
  typeof useApiPagination<IPartner, unknown>
>[1];

function useLocalPartnerTable(
  fetcher: Fetcher,
  options?: UsePartnerTableOptions,
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
  } = useApiPagination<IPartner, unknown>(fetcher, options);

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

const PartnerTableContext = createContext<PartnerTableContextValue>(null);

export function PartnerTableProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useLocalPartnerTable(getParnerListApi, {
    defaultPageSize: 5,
    queryKeyBase: 'partners',
    syncWithUrl: true,
  });

  return (
    <PartnerTableContext.Provider value={value}>
      {children}
    </PartnerTableContext.Provider>
  );
}

export function usePartnerTable() {
  const ctx = useContext(PartnerTableContext);
  if (!ctx) {
    throw new Error(
      'usePartnerTable must be used within a PartnerTableProvider',
    );
  }
  return ctx;
}
