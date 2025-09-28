import { useCallback, useMemo, useState } from 'react';
import {
  ApiRequestOption,
  ApiResponseWithPagination,
} from '@/utilities/axios/types';
import { PaginationState } from '@tanstack/react-table';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

type Fetcher<T> = (
  opts?: ApiRequestOption,
) => Promise<ApiResponseWithPagination<T>>;

interface UseServerTableOptions {
  defaultPageSize?: number;
  queryKeyBase?: string;
  syncWithUrl?: boolean;
  defaultSearch?: string;
}

export function useServerTable<T>(
  fetcher: Fetcher<T>,
  options?: UseServerTableOptions,
) {
  const {
    defaultPageSize = 5,
    queryKeyBase = 'server-table',
    syncWithUrl = true,
    defaultSearch = '',
  } = options || {};

  const [searchParams, setSearchParams] = useSearchParams();

  const initialPagination = useMemo<PaginationState>(() => {
    if (!syncWithUrl) {
      return { pageIndex: 0, pageSize: defaultPageSize };
    }
    const page = Number(searchParams.get('page') ?? '1');
    const pageSize = Number(
      searchParams.get('pageSize') ?? String(defaultPageSize),
    );
    return {
      pageIndex: Number.isFinite(page) ? Math.max(0, page - 1) : 0,
      pageSize: Number.isFinite(pageSize) ? pageSize : defaultPageSize,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [pagination, setPaginationState] =
    useState<PaginationState>(initialPagination);

  const [search, setSearchState] = useState<string | undefined>(() => {
    if (!syncWithUrl) return defaultSearch || undefined;
    return searchParams.get('q') ?? defaultSearch ?? undefined;
  });

  const setPagination = useCallback(
    (next: PaginationState | ((p: PaginationState) => PaginationState)) => {
      setPaginationState((prev) => {
        const newState =
          typeof next === 'function' ? (next as any)(prev) : next;
        if (syncWithUrl) {
          const params = new URLSearchParams(searchParams.toString());
          params.set('page', String(newState.pageIndex + 1));
          params.set('pageSize', String(newState.pageSize));
          setSearchParams(params, { replace: true });
        }
        return newState;
      });
    },
    [searchParams, setSearchParams, syncWithUrl],
  );

  const setSearch = useCallback(
    (value?: string) => {
      setSearchState(value);
      if (syncWithUrl) {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value.length > 0) {
          params.set('q', value);
        } else {
          params.delete('q');
        }
        // keep current page when searching? typically reset to page 1
        params.set('page', '1');
        setSearchParams(params, { replace: true });
        // also reset local pagination to first page
        setPaginationState((prev) => ({ ...prev, pageIndex: 0 }));
      }
    },
    [searchParams, setSearchParams, syncWithUrl],
  );

  const apiOptions = useMemo<ApiRequestOption>(() => {
    return {
      start: pagination.pageIndex * pagination.pageSize,
      count: pagination.pageSize,
      quickSearch: search,
    };
  }, [pagination.pageIndex, pagination.pageSize, search]);

  const queryKey = useMemo(
    () => [
      queryKeyBase,
      apiOptions.start ?? 0,
      apiOptions.count ?? 0,
      apiOptions.quickSearch ?? '',
    ],
    [queryKeyBase, apiOptions.start, apiOptions.count, apiOptions.quickSearch],
  );

  const query = useQuery<ApiResponseWithPagination<T>>({
    queryKey,
    queryFn: async () => await fetcher(apiOptions),
    keepPreviousData: true,
    retry: 0,
  });

  const data = query.data?.data ?? [];
  const total = query.data?.total ?? 0;

  return {
    pagination,
    setPagination,
    search,
    setSearch,
    apiOptions,
    data,
    total,
    isLoading: query.isLoading,
    query,
  } as const;
}
