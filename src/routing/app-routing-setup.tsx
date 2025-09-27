import { AuthRouting } from '@/auth/auth-routing';
import { useAuth } from '@/auth/context/auth-context';
import { RequireAuth } from '@/auth/require-auth';
import { ErrorRouting } from '@/errors/error-routing';
import { MainLayout } from '@/layouts/main-layout/layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTE_PATHS } from './paths';
import { HomePage } from '@/features/home';

export function AppRoutingSetup() {
  const { activeRole } = useAuth();

  return (
    <Routes>
      <Route path={`${ROUTE_PATHS.ERROR}/*`} element={<ErrorRouting />} />
      <Route path={`${ROUTE_PATHS.AUTH}/*`} element={<AuthRouting />} />

      <Route element={<RequireAuth />}>
       <Route element={<MainLayout />}>
            <Route
              path='/'
              element={<HomePage />}
            />
          </Route>

        {!activeRole && (
          <Route path="*" element={<Navigate to={ROUTE_PATHS.AUTH} />} />
        )}

        <Route path="*" element={<Navigate to={ROUTE_PATHS.ERROR_404} />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTE_PATHS.AUTH} />} />
    </Routes>
  );
}
