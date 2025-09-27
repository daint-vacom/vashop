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
  { path: ROUTE_PATHS.EMPLOYEE_MANAGEMENT, name: 'Quản lý nhân sự' },
  { path: ROUTE_PATHS.EMPLOYEE_DETAIL(), name: 'Chi tiết nhân sự' },
  { path: ROUTE_PATHS.YEAR_PLAN, name: 'Quản lý kế hoạch năm' },
  { path: ROUTE_PATHS.YEAR_PLAN_DETAIL(), name: 'Chi tiết kế hoạch' },
  { path: ROUTE_PATHS.YEAR_PLAN_ADMIN_DEPARTMENT_DETAIL(), name: 'Phòng ban' },
  {
    path: ROUTE_PATHS.YEAR_PLAN_ADMIN_EXAM_DETAIL_DEPARTMENT(),
    name: 'Kỳ thi',
  },
  { path: ROUTE_PATHS.YEAR_PLAN_EXAM_DETAIL_ADMIN(), name: 'Kỳ thi' },
  { path: ROUTE_PATHS.YEAR_PLAN_EXAM_DETAIL_DEPARTMENT(), name: 'Kỳ thi' },
  { path: ROUTE_PATHS.EXAM, name: 'Quản lý kỳ thi', clickable: false },
  { path: ROUTE_PATHS.EXAM_PLAN, name: 'Kế hoạch' },
  { path: ROUTE_PATHS.EXAM_PLAN_DETAIL(), name: 'Chi tiết kế hoạch' },
  { path: ROUTE_PATHS.EXAM_REGISTRATION, name: 'Đăng ký' },
  { path: ROUTE_PATHS.EXAM_REGISTRATION_DETAIL(), name: 'Chi tiết đăng ký' },
  { path: ROUTE_PATHS.EXAM_REVIEW, name: 'Rà soát' },
  { path: ROUTE_PATHS.EXAM_REVIEW_DETAIL(), name: 'Chi tiết rà soát' },
  { path: ROUTE_PATHS.EXAM_REVIEW_DEPARTMENT_DETAIL(), name: 'Phòng ban' },
  { path: ROUTE_PATHS.EXAM_APPROVED, name: 'Phê duyệt' },
  { path: ROUTE_PATHS.EXAM_APPROVED_DETAIL(), name: 'Chi tiết phê duyệt' },
  { path: ROUTE_PATHS.TOPIC, name: 'Quản lý đề tài', clickable: false },
  { path: ROUTE_PATHS.TOPIC_REGISTRATION, name: 'Đăng ký' },
  { path: ROUTE_PATHS.TOPIC_REGISTRATION_DETAIL(), name: 'Chi tiết đăng ký' },
  { path: ROUTE_PATHS.TOPIC_REVIEW, name: 'Rà soát' },
  { path: ROUTE_PATHS.TOPIC_REVIEW_DETAIL(), name: 'Chi tiết rà soát' },
  { path: ROUTE_PATHS.TOPIC_REVIEW_DEPARTMENT_DETAIL(), name: 'Phòng ban' },
  { path: ROUTE_PATHS.TOPIC_APPROVED, name: 'Phê duyệt' },
  { path: ROUTE_PATHS.TOPIC_APPROVED_DETAIL(), name: 'Chi tiết phê duyệt' },
  { path: ROUTE_PATHS.EDUCATION, name: 'Quản lý đào tạo', clickable: false },
  { path: ROUTE_PATHS.EDUCATION_RESULT, name: 'Kết quả bồi huấn' },
  { path: ROUTE_PATHS.EDUCATION_RESULT_DETAIL(), name: 'Chi tiết kết quả' },
  { path: ROUTE_PATHS.EXAM_SCHEDULE, name: 'Lịch thi' },
  { path: ROUTE_PATHS.EXAM_SCHEDULE_DETAIL(), name: 'Chi tiết lịch thi' },
  { path: ROUTE_PATHS.EXAM_RESULT, name: 'Kết quả thi' },
  { path: ROUTE_PATHS.EXAM_RESULT_DETAIL(), name: 'Chi tiết kết quả' },
  { path: ROUTE_PATHS.EXAM_DECISION, name: 'Quyết định thi' },
  { path: ROUTE_PATHS.EXAM_DECISION_DETAIL(), name: 'Chi tiết quyết định' },
  { path: ROUTE_PATHS.SYSTEM, name: 'Hệ thống', clickable: false },
  {
    path: ROUTE_PATHS.SYSTEM_DEPARTMENT_LIST,
    name: 'Quản lý phòng ban - tổ/nhóm',
  },
  { path: ROUTE_PATHS.SYSTEM_POSITION_LIST, name: 'Quản lý chức danh' },
  { path: ROUTE_PATHS.SYSTEM_AREA_LIST, name: 'Quản lý chuyên môn' },
  { path: ROUTE_PATHS.SYSTEM_PAYROLL_LIST, name: 'Quản lý lương' },

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
