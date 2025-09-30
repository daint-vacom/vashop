import { Fragment } from 'react';
import { PageContainer } from '@/layouts/main-layout/components/containers/container';
import {
  Toolbar,
  ToolbarHeading,
} from '@/layouts/main-layout/components/toolbar';
import { EmployeeTableProvider } from '../../providers/employee-table.provider';
import { EmployeeTable } from './components/employee-table';

export function EmployeeManagementPage() {
  return (
    <Fragment>
      <PageContainer>
        <Toolbar>
          <ToolbarHeading title="Quản Lý Nhân Viên" />
        </Toolbar>
      </PageContainer>
      <EmployeeTableProvider>
        <PageContainer>
          <div className="page-content">
            <EmployeeTable />
          </div>
        </PageContainer>
      </EmployeeTableProvider>
    </Fragment>
  );
}
