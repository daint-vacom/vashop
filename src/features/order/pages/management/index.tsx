import { Fragment } from 'react';
import { PageContainer } from '@/layouts/main-layout/components/containers/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
} from '@/layouts/main-layout/components/toolbar';
import { ROUTE_PATHS } from '@/routing/paths';
import { TimeParam } from '@/utilities/axios/params/time.param';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { useServerTable } from '@/components/ui/tables/use-server-table';
import { IOrder } from '../../models/order.model';
import { getOrderListApi } from '../../services/order.service';
import { OrderTable } from './components/order-table';

export function OrderManagementPage() {
  const navigate = useNavigate();

  const {
    pagination: tablePagination,
    setPagination: setTablePagination,
    data,
    total,
    search,
    setSearch,
  } = useServerTable<IOrder, TimeParam>(getOrderListApi, {
    defaultPageSize: 5,
    queryKeyBase: 'orders',
    syncWithUrl: true,
  });

  const handleAddClick = () => {
    navigate(ROUTE_PATHS.ORDER_ADD);
  };

  return (
    <Fragment>
      <PageContainer>
        <Toolbar>
          <ToolbarHeading title="Quản Lý Đơn Hàng" />
          <ToolbarActions>
            <Button variant="primary" onClick={handleAddClick}>
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
