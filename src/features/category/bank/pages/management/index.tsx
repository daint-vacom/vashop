import { Fragment } from 'react';
import { PageContainer } from '@/layouts/main-layout/components/containers/container';
import {
  Toolbar,
  ToolbarHeading,
} from '@/layouts/main-layout/components/toolbar';
import { BankAccountTableProvider } from '../../providers/bank-table.provider';
import { BankAccountTable } from './components/bank-table';

export function BankAccountManagementPage() {
  return (
    <Fragment>
      <PageContainer>
        <Toolbar>
          <ToolbarHeading title="Quản Lý Ngân Hàng" />
        </Toolbar>
      </PageContainer>
      <BankAccountTableProvider>
        <PageContainer>
          <div className="page-content">
            <BankAccountTable />
          </div>
        </PageContainer>
      </BankAccountTableProvider>
    </Fragment>
  );
}
