import { Fragment, useEffect } from 'react';
import { useBreadcrumb } from '@/layouts/main-layout/components/breadcrumb';
import { PageContainer } from '@/layouts/main-layout/components/containers/container';
import { ROUTE_PATHS } from '@/routing/paths';
import { OrderDetailForm } from '../../components/edit-order-form';

export function OrderAddPage() {
  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb(ROUTE_PATHS.ORDER_ADD, 'Tạo đơn hàng');
  }, []);

  return (
    <Fragment>
      <PageContainer>
        <OrderDetailForm />
      </PageContainer>
    </Fragment>
  );
}
