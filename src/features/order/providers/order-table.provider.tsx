import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { TimeParam, TimeRange } from '@/utilities/axios/params/time.param';
import {
  ApiRequestOption,
  ApiResponseWithPagination,
} from '@/utilities/axios/types';
import { useApiPagination } from '@/hooks/queries/use-api-pagination';
import { IOrder } from '../models/order.model';
import { getOrderListApi } from '../services/order.service';

type OrderTableContextValue = ReturnType<typeof useLocalOrderTable> | null;

type Fetcher = (
  opts?: ApiRequestOption & TimeParam,
) => Promise<ApiResponseWithPagination<IOrder>>;
type UseOrderTableOptions = Parameters<
  typeof useApiPagination<IOrder, TimeParam>
>[1];

function useLocalOrderTable(fetcher: Fetcher, options?: UseOrderTableOptions) {
  // local time range state (maps to TimeParam.time)
  const [timeRange, setTimeRangeState] = useState<TimeRange | undefined>(
    undefined,
  );

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
    // note: useServerTable exposes extra and setExtra; keep them available internally
    // so we can merge time into the extra params, but DO NOT expose them in the
    // returned object (per requirement).
    extra,
    setExtra,
  } = useApiPagination<IOrder, TimeParam>(fetcher, options);

  // If useServerTable initialized `extra` from URL (syncWithUrl=true)
  // it may contain a `time` param. Ensure the local `timeRange` state
  // reflects that initial value so the UI select shows the URL state.
  useEffect(() => {
    try {
      const extraTime = (extra as TimeParam | undefined)?.time;
      if (timeRange === undefined && extraTime !== undefined) {
        setTimeRangeState(extraTime);
      }
    } catch {
      // ignore parsing errors
    }
  }, [extra, timeRange]);

  const setTimeRange = useCallback(
    (value?: TimeRange) => {
      setTimeRangeState(value);
      // merge time into extra params so useServerTable.apiOptions includes time
      if (typeof setExtra === 'function') {
        // Use functional update to avoid overwriting other extra keys
        setExtra(
          (prev) =>
            Object.assign({}, (prev as TimeParam) ?? {}, {
              time: value,
            }) as TimeParam,
        );
      }
    },
    [setExtra],
  );

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
    timeRange,
    setTimeRange,
  } as const;
}

const OrderTableContext = createContext<OrderTableContextValue>(null);

export function OrderTableProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Provider does not accept initial values; it computes them via a local hook
  const value = useLocalOrderTable(getOrderListApi, {
    defaultPageSize: 5,
    queryKeyBase: 'orders',
    syncWithUrl: true,
  });

  return (
    <OrderTableContext.Provider value={value}>
      {children}
    </OrderTableContext.Provider>
  );
}

export function useOrderTable() {
  const ctx = useContext(OrderTableContext);
  if (!ctx) {
    throw new Error('useOrderTable must be used within an OrderTableProvider');
  }
  return ctx;
}
