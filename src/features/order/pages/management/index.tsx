import { Fragment } from 'react';
import { PageContainer } from '@/layouts/main-layout/components/containers/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
} from '@/layouts/main-layout/components/toolbar';
import { ROUTE_PATHS } from '@/routing/paths';
// no direct TimeParam usage here; table state is provided by OrderTableProvider
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { OrderTableProvider } from '../../providers/order-table-provider';
import { OrderTable } from './components/order-table';

export function OrderManagementPage() {
  const navigate = useNavigate();

  // table state is provided by OrderTableProvider and consumed inside OrderTable

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
      <OrderTableProvider>
        <PageContainer>
          <div className="page-content">
            <OrderTable />
          </div>
        </PageContainer>
      </OrderTableProvider>
    </Fragment>
  );
}
