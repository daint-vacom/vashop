import { Fragment } from 'react';
import { PageContainer } from '@/layouts/main-layout/components/containers/container';
import {
  Toolbar,
  ToolbarHeading,
} from '@/layouts/main-layout/components/toolbar';
import { PartnerTableProvider } from '../../providers/partner-table.provider';
import { PartnerTable } from './components/partner-table';

export function PartnerManagementPage() {
  return (
    <Fragment>
      <PageContainer>
        <Toolbar>
          <ToolbarHeading title="Quản Lý Đối Tác" />
        </Toolbar>
      </PageContainer>
      <PartnerTableProvider>
        <PageContainer>
          <div className="page-content">
            <PartnerTable />
          </div>
        </PageContainer>
      </PartnerTableProvider>
    </Fragment>
  );
}
