import { AuthRouting } from '@/features/auth/auth-routing';
import { RequireAuth } from '@/features/auth/require-auth';
import { PartnerManagementPage } from '@/features/category/partner/pages/management';
import { ErrorRouting } from '@/features/errors/error-routing';
import { HomePage } from '@/features/home';
import { OrderAddPage } from '@/features/order/pages/add';
import { OrderDetailPage } from '@/features/order/pages/detail';
import { OrderManagementPage } from '@/features/order/pages/management';
import { MainLayout } from '@/layouts/main-layout/layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTE_PATHS } from './paths';

export function AppRoutingSetup() {
  return (
    <Routes>
      <Route path={`${ROUTE_PATHS.ERROR}/*`} element={<ErrorRouting />} />
      <Route path={`${ROUTE_PATHS.AUTH}/*`} element={<AuthRouting />} />

      <Route element={<RequireAuth />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTE_PATHS.HOME} element={<HomePage />} />

          <Route
            path={ROUTE_PATHS.ORDER_MANAGEMENT}
            element={<OrderManagementPage />}
          />
          <Route
            path={ROUTE_PATHS.ORDER_DETAIL()}
            element={<OrderDetailPage />}
          />
          <Route path={ROUTE_PATHS.ORDER_ADD} element={<OrderAddPage />} />

          <Route
            path={ROUTE_PATHS.CATEGORIES.PARTNER}
            element={<PartnerManagementPage />}
          />
        </Route>

        <Route path="*" element={<Navigate to={ROUTE_PATHS.ERROR_404} />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTE_PATHS.AUTH} />} />
    </Routes>
  );
}
