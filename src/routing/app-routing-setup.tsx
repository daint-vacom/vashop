import { AuthRouting } from '@/features/auth/auth-routing';
import { useAuth } from '@/features/auth/context/auth-context';
import { RequireAuth } from '@/features/auth/require-auth';
import { ErrorRouting } from '@/features/errors/error-routing';
import { HomePage } from '@/features/home';
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
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTE_PATHS.ERROR_404} />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTE_PATHS.AUTH} />} />
    </Routes>
  );
}
