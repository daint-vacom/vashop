import { Fragment } from 'react';
import { PageContainer } from '@/layouts/main-layout/components/containers/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
} from '@/layouts/main-layout/components/toolbar';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useServerTable } from '@/components/ui/tables/use-server-table';
import { getOrderListApi } from '../../services/order.service';
import { OrderTable } from './components/order-table';

export function OrderManagementPage() {
  // Use the shared server table hook which handles API fetching, pagination state and URL sync
  const {
    pagination: tablePagination,
    setPagination: setTablePagination,
    data,
    total,
    isLoading,
    search,
    setSearch,
  } = useServerTable(getOrderListApi, {
    defaultPageSize: 5,
    queryKeyBase: 'orders',
    syncWithUrl: true,
  });

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
            data={data}
            totalCount={total}
            pagination={tablePagination}
            onPaginationChange={setTablePagination}
            search={search}
            onSearchChange={setSearch}
          />
        </div>
      </PageContainer>
    </Fragment>
  );
}
