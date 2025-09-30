import React, { createContext, useContext, useMemo } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ROUTE_PATHS } from '../../../routing/paths';

interface BreadcrumbRoute {
  path: string | ((arg?: any) => string);
  name: string;
  clickable?: boolean;
}

const breadcrumbRoutes: BreadcrumbRoute[] = [
  { path: ROUTE_PATHS.HOME, name: 'Trang chủ' },
  { path: ROUTE_PATHS.ORDER_MANAGEMENT, name: 'Quản lý đơn hàng' },
  { path: ROUTE_PATHS.ORDER_DETAIL(), name: 'Chi tiết đơn hàng' },

  { path: ROUTE_PATHS.CATEGORIES.INDEX, name: 'Danh mục' },
  { path: ROUTE_PATHS.CATEGORIES.PARTNER, name: 'Quản lý đối tác' },
  { path: ROUTE_PATHS.CATEGORIES.PARTNER_GROUP, name: 'Quản lý nhóm đối tác' },
  { path: ROUTE_PATHS.CATEGORIES.EMPLOYEE, name: 'Quản lý nhân viên' },
  { path: ROUTE_PATHS.CATEGORIES.PRODUCT_GROUP, name: 'Quản lý nhóm hàng' },
  { path: ROUTE_PATHS.CATEGORIES.BANK, name: 'Quản lý ngân hàng' },
  { path: ROUTE_PATHS.CATEGORIES.DEPARTMENT, name: 'Quản lý phòng ban' },
  { path: ROUTE_PATHS.CATEGORIES.WAREHOUSE, name: 'Quản lý kho' },

  { path: ROUTE_PATHS.CHANGE_PASSWORD, name: 'Đổi mật khẩu' },
];

// Context để quản lý breadcrumb overrides
type BreadcrumbOverride = { [path: string]: string | React.ReactNode };
interface BreadcrumbContextType {
  overrides: BreadcrumbOverride;
  updateBreadcrumb: (path: string, content: string | React.ReactNode) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType>({
  overrides: {},
  updateBreadcrumb: () => {},
});

interface Crumb {
  path: string;
  content: React.ReactNode;
  clickable?: boolean;
}

// Provider để wrap ứng dụng
export const BreadcrumbProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [overrides, setOverrides] = React.useState<BreadcrumbOverride>({});

  const updateBreadcrumb = (
    path: string,
    content: string | React.ReactNode,
  ) => {
    setOverrides((prev) => ({ ...prev, [path]: content }));
  };

  return (
    <BreadcrumbContext.Provider value={{ overrides, updateBreadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

// Hook để sử dụng trong component page
export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
};

// Component Breadcrumbs
const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { overrides } = useBreadcrumb();
  const pathnames =
    location.pathname === '/'
      ? ['']
      : location.pathname.split('/').filter((x) => x);

  const crumbs = useMemo<Crumb[]>(() => {
    let currentPath = '';
    const result: Crumb[] = [];
    pathnames.forEach((value) => {
      currentPath += value === '' ? '/' : `/${value}`;
      const matchedRoute = breadcrumbRoutes.find((route) =>
        matchPath(
          {
            path: typeof route.path === 'string' ? route.path : route.path(),
            end: true,
          },
          currentPath,
        ),
      );
      if (matchedRoute) {
        const content = overrides[currentPath] || matchedRoute.name || value;
        result.push({
          path: currentPath,
          content: content,
          clickable: matchedRoute.clickable !== false,
        });
      }
    });
    return result;
  }, [location.pathname, overrides]);

  const renderCrumb = (crumb: Crumb, isLast: boolean) => {
    if (isLast)
      return (
        <BreadcrumbPage className="text-mono font-medium">
          {crumb.content}
        </BreadcrumbPage>
      );
    if (crumb.clickable === false)
      return (
        <BreadcrumbPage className="text-secondary-foreground font-normal">
          {crumb.content}
        </BreadcrumbPage>
      );
    return (
      <BreadcrumbLink asChild className="text-secondary-foreground font-normal">
        <Link to={crumb.path}>{crumb.content}</Link>
      </BreadcrumbLink>
    );
  };

  return (
    <Breadcrumb className="flex items-center gap-1.25 text-xs lg:text-sm font-medium mb-2.5 lg:mb-0">
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <>
            <BreadcrumbItem key={crumb.path}>
              {renderCrumb(crumb, index === crumbs.length - 1)}
            </BreadcrumbItem>
            {index === crumbs.length - 1 ? null : (
              <BreadcrumbSeparator key={`separator-${index}`} />
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
