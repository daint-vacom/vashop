import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ApiRequestOption,
  ApiResponseWithPagination,
  FilterCondition,
} from '@/utilities/axios/types';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

export interface ApiPaginationState {
  pageIndex: number;
  pageSize: number;
}

type Fetcher<T, E = unknown> = (
  opts?: ApiRequestOption & E,
) => Promise<ApiResponseWithPagination<T>>;

interface UseApiFetchOptions {
  defaultPageSize?: number;
  queryKeyBase: string;
  syncWithUrl?: boolean;
  /** When true, reset to first page when search, extra params or pageSize change */
  resetPageOnChange?: boolean;
  defaultSearch?: string;
}

export function useApiPagination<T, E = unknown>(
  fetcher: Fetcher<T, E>,
  options?: UseApiFetchOptions,
) {
  const {
    defaultPageSize = 5,
    queryKeyBase,
    syncWithUrl = true,
    resetPageOnChange = true,
    defaultSearch = '',
  } = options || {};

  const [searchParams, setSearchParams] = useSearchParams();

  const initialPagination = useMemo<ApiPaginationState>(() => {
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
    useState<ApiPaginationState>(initialPagination);

  const [search, setSearchState] = useState<string | undefined>(() => {
    if (!syncWithUrl) return defaultSearch || undefined;
    return searchParams.get('q') ?? defaultSearch ?? undefined;
  });

  // filters are represented as a record keyed by columnName for easier FE manipulation
  const [filters, setFiltersState] = useState<Record<string, FilterCondition>>(
    () => {
      if (!syncWithUrl) return {};
      const raw = searchParams.get('filterConditions');
      if (!raw) return {};
      try {
        const arr: FilterCondition[] = JSON.parse(raw);
        const rec: Record<string, FilterCondition> = {};
        for (const item of arr) {
          if (!item || !item.columnName) continue;
          rec[item.columnName] = item;
        }
        return Object.keys(rec).length > 0 ? rec : {};
      } catch {
        return {};
      }
    },
  );

  // extra API params for specific APIs
  // If `syncWithUrl` is enabled, initialize `extra` from URL search params
  // (excluding pagination and quick search) so callers that rely on
  // extra params (like `time`) will reflect URL state on load.
  const [extra, setExtraState] = useState<E | undefined>(() => {
    if (!syncWithUrl) return undefined;
    // don't treat `filterConditions` as generic extra; it's handled by `filters`
    const skip = new Set(['page', 'pageSize', 'q', 'filterConditions']);
    const entries = Array.from(searchParams.entries()).filter(
      ([k]) => !skip.has(k),
    );
    if (entries.length === 0) return undefined;
    const obj: Record<string, unknown> = {};
    for (const [k, v] of entries) {
      // try to parse JSON values (for complex params), fallback to string
      try {
        obj[k] = JSON.parse(v);
      } catch {
        obj[k] = v;
      }
    }
    return obj as E;
  });

  const setPagination = useCallback(
    (
      next:
        | ApiPaginationState
        | ((p: ApiPaginationState) => ApiPaginationState),
    ) => {
      setPaginationState((prev) => {
        const newState =
          typeof next === 'function'
            ? (next as (p: ApiPaginationState) => ApiPaginationState)(prev)
            : next;
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

  const apiOptions = useMemo<ApiRequestOption & E>(() => {
    const base: ApiRequestOption = {
      start: pagination.pageIndex * pagination.pageSize,
      count: pagination.pageSize,
      quickSearch: search,
    };
    // merge extra params if provided
    const merged = Object.assign({}, base, extra) as ApiRequestOption & E;
    // convert filters record to array for `filterConditions` payload
    if (filters && typeof filters === 'object') {
      const arr: FilterCondition[] = Object.values(
        filters as Record<string, FilterCondition>,
      );
      if (arr.length > 0) {
        // attach to the payload using the expected key
        (merged as ApiRequestOption).filterConditions = arr;
      }
    }
    return merged;
  }, [pagination.pageIndex, pagination.pageSize, search, extra, filters]);

  // Track initial mount so we don't reset page on first render when syncing from URL
  const [isMounted, setIsMounted] = useState(false);

  // Reset to first page when search, extra or pageSize change (if enabled)
  useEffect(() => {
    if (!resetPageOnChange) return;
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
    // when pageSize changes, also reset to first page
    setPaginationState((prev) => ({ ...prev, pageIndex: 0 }));
    if (syncWithUrl) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', '1');
      setSearchParams(params, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, extra, pagination.pageSize, resetPageOnChange]);

  const queryKey = useMemo(() => {
    // safe stringify extra for key (fallback to String if circular)
    let extraKey = '';
    try {
      extraKey = extra ? JSON.stringify(extra) : '';
    } catch {
      extraKey = String(extra);
    }
    // include serialized filters in key to ensure cache varies by filters
    let filtersKey = '';
    try {
      filtersKey = filters ? JSON.stringify(filters) : '';
    } catch {
      filtersKey = String(filters);
    }
    return [
      queryKeyBase,
      apiOptions.start ?? 0,
      apiOptions.count ?? 0,
      apiOptions.quickSearch ?? '',
      extraKey,
      filtersKey,
    ];
  }, [
    queryKeyBase,
    apiOptions.start,
    apiOptions.count,
    apiOptions.quickSearch,
    extra,
    filters,
  ]);

  const query = useQuery<ApiResponseWithPagination<T>>({
    queryKey,
    queryFn: async () => await fetcher(apiOptions),
    keepPreviousData: true,
    retry: 0,
  });

  const data = query.data?.data ?? [];
  const total = query.data?.total ?? 0;

  // keep `extra` reflected in URL search params when enabled
  useEffect(() => {
    if (!syncWithUrl) return;
    // Build params from the authoritative local state (pagination & search)
    const params = new URLSearchParams();
    // set pagination values from state so we don't accidentally reintroduce
    // a stale `page` value that was captured earlier
    params.set('page', String(pagination.pageIndex + 1));
    params.set('pageSize', String(pagination.pageSize));
    // include quick search if present
    if (search && search.length > 0) {
      params.set('q', search);
    }
    // write current extra keys
    if (extra && typeof extra === 'object') {
      for (const [k, v] of Object.entries(extra as Record<string, unknown>)) {
        if (v === undefined || v === null) continue;
        if (typeof v === 'string') {
          params.set(k, v as string);
        } else {
          try {
            params.set(k, JSON.stringify(v));
          } catch {
            params.set(k, String(v));
          }
        }
      }
    }
    // include filters as JSON array under `filterConditions` param
    if (filters && typeof filters === 'object') {
      try {
        const arr: FilterCondition[] = Object.values(
          filters as Record<string, FilterCondition>,
        );
        if (arr.length > 0) {
          params.set('filterConditions', JSON.stringify(arr));
        }
      } catch {
        // ignore serialization errors
      }
    }
    setSearchParams(params, { replace: true });
  }, [
    extra,
    syncWithUrl,
    pagination.pageIndex,
    pagination.pageSize,
    search,
    filters,
    setSearchParams,
  ]);

  const refetch = useCallback(
    (resetToPage?: number) => {
      if (resetToPage !== undefined) {
        // Treat the passed page number as 1-based (friendly API). Convert to
        // zero-based pageIndex for internal state.
        const pageIndex = Math.max(0, resetToPage - 1);
        setPagination((prev) => ({ ...prev, pageIndex }));
        return Promise.resolve();
      }
      return query.refetch();
    },
    [query, setPagination],
  );

  // set a single filter entry (field == columnName). Passing `undefined` removes it.
  const setFilter = useCallback(
    (field: string, value?: FilterCondition) => {
      setFiltersState((prev) => {
        const next = prev ? { ...prev } : {};
        if (value === undefined || value === null) {
          // remove the key
          delete next[field];
        } else {
          next[field] = value;
        }
        return Object.keys(next).length > 0 ? next : {};
      });
      // If URL sync is enabled, update URL immediately to reflect single change
      if (syncWithUrl) {
        const params = new URLSearchParams(searchParams.toString());
        // update the filters param based on the new local filters state
        try {
          const curRaw = params.get('filterConditions');
          const curArr: FilterCondition[] = curRaw ? JSON.parse(curRaw) : [];
          const map: Record<string, FilterCondition> = {};
          for (const it of curArr) {
            if (it && it.columnName) map[it.columnName] = it;
          }
          if (value === undefined || value === null) {
            delete map[field];
          } else {
            map[field] = value;
          }
          const arr = Object.values(map);
          if (arr.length > 0) {
            params.set('filterConditions', JSON.stringify(arr));
          } else {
            params.delete('filterConditions');
          }
        } catch {
          // fallback: remove param to avoid leaving malformed data
          params.delete('filterConditions');
        }
        // reset to first page when changing filters
        params.set('page', '1');
        setSearchParams(params, { replace: true });
        // also reset local pagination to first page
        setPaginationState((prev) => ({ ...prev, pageIndex: 0 }));
      }
    },
    [searchParams, setSearchParams, setPaginationState, syncWithUrl],
  );

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
    // expose extra params and setter so callers can pass additional API options
    extra,
    setExtra: setExtraState,
    // filters (user-facing record) and setter
    filters,
    setFilters: setFiltersState,
    setFilter,
    refetch: refetch,
  } as const;
}
