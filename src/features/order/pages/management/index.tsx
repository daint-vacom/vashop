import { Fragment, useMemo, useState } from 'react';
import { PageContainer } from '@/layouts/main-layout/components/containers/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
} from '@/layouts/main-layout/components/toolbar';
import { PaginationState } from '@tanstack/react-table';
import { PlusCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useOrderListQuery } from '../../hooks/queries/use-order-query';
import { OrderTable } from './components/order-table';

export function OrderManagementPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read pagination from URL search params (page, pageSize). `page` is 1-based in URL.
  const initialPagination = useMemo<PaginationState>(() => {
    const page = Number(searchParams.get('page') ?? '1');
    const pageSize = Number(searchParams.get('pageSize') ?? '5');
    return {
      pageIndex: Math.max(0, Number.isFinite(page) ? page - 1 : 0),
      pageSize: Number.isFinite(pageSize) ? pageSize : 5,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [pagination, setPaginationState] =
    useState<PaginationState>(initialPagination);

  // Helper to update both local state and URL params
  const setPagination = (
    next: PaginationState | ((p: PaginationState) => PaginationState),
  ) => {
    setPaginationState((prev) => {
      const newState = typeof next === 'function' ? (next as any)(prev) : next;
      // Update URL (page is 1-based)
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(newState.pageIndex + 1));
      params.set('pageSize', String(newState.pageSize));
      setSearchParams(params, { replace: true });
      return newState;
    });
  };

  const apiOptions = useMemo(
    () => ({
      start: pagination.pageIndex * pagination.pageSize,
      count: pagination.pageSize,
    }),
    [pagination.pageIndex, pagination.pageSize],
  );

  const { data: orders } = useOrderListQuery(apiOptions);

  return (
    <Fragment>
      <PageContainer>
        <Toolbar>
          <ToolbarHeading title="Quản Lý Đơn Hàng" />
          <ToolbarActions>
            <Button variant="primary">
              <PlusCircle /> Tạo đơn
            </Button>
          </ToolbarActions>
        </Toolbar>
      </PageContainer>
      <PageContainer>
        <div className="page-content">
          <OrderTable
            data={orders?.data}
            totalCount={orders?.total}
            pagination={pagination}
            onPaginationChange={setPagination}
          />
        </div>
      </PageContainer>
    </Fragment>
  );
}
