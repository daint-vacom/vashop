import { Fragment } from 'react';
import { PageContainer } from '@/layouts/main-layout/components/containers/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
} from '@/layouts/main-layout/components/toolbar';
import { FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function OrderManagementPage() {
  return (
    <Fragment>
      <PageContainer>
        <Toolbar>
          <ToolbarHeading title="Quản Lý Đơn Hàng" />
          <ToolbarActions>
            <Button variant="outline">
              <FileDown /> Xuất Biểu Mẫu
            </Button>
          </ToolbarActions>
        </Toolbar>
      </PageContainer>
      <PageContainer>
        <div className="page-content">abc</div>
      </PageContainer>
    </Fragment>
  );
}
