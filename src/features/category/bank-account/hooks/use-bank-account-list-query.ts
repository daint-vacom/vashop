import {
  ApiRequestOption,
  ApiResponseWithPagination,
} from '@/utilities/axios/types';
import { useApiPagination } from '@/hooks/queries/use-api-pagination';
import IBankAccount from '../models/bank-account.model';
import { getBankAccountListApi } from '../services/bank.service';

type UseBankAccountTableOptions = Parameters<
  typeof useApiPagination<IBankAccount, unknown>
>[1];

type Fetcher = (
  opts?: ApiRequestOption,
) => Promise<ApiResponseWithPagination<IBankAccount>>;

export function useBankAccountListQuery({
  fetch = getBankAccountListApi,
  options,
}: { fetch?: Fetcher; options?: UseBankAccountTableOptions } = {}) {
  const defaultOptions = {
    defaultPageSize: 5,
    queryKeyBase: 'banks',
    syncWithUrl: true,
  };
  const mergedOptions = { ...defaultOptions, ...options };
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
  } = useApiPagination<IBankAccount, unknown>(fetch, mergedOptions);

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
