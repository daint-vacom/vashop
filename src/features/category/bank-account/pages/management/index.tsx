import { Fragment, useState } from 'react';
import { PageContainer } from '@/layouts/main-layout/components/containers/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
} from '@/layouts/main-layout/components/toolbar';
import { zodResolver } from '@hookform/resolvers/zod';
import { Landmark } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { BankAccountTableProvider } from '../../providers/bank-account-table.provider';
import {
  editBankAccountSchema,
  EditBankAccountSchemaType,
} from '../../schemas/edit-bank-account.schema';
import { BankAccountTable } from './components/bank-account-table';
import { EditBankAccountDialog } from './components/edit-bank-account-dialog';

export function BankAccountManagementPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const getFormDefaultValues = (): EditBankAccountSchemaType => ({
    accNbr: '',
    name: '',
    owner: '',
    branch: null,
    bankCode: '',
  });

  const form = useForm<EditBankAccountSchemaType>({
    resolver: zodResolver(editBankAccountSchema),
    defaultValues: getFormDefaultValues(),
  });

  const handleAddOpen = () => {
    setIsAddOpen(true);
  };

  const handleAddClose = () => {
    setIsAddOpen(false);
  };

  const handleOnAdd = (data: EditBankAccountSchemaType) => {
    console.log('data', data);
  };

  return (
    <BankAccountTableProvider>
      <Fragment>
        <PageContainer>
          <Toolbar>
            <ToolbarHeading title="Quản Lý Tài Khoản Ngân Hàng" />
            <ToolbarActions>
              <Button variant="primary" onClick={handleAddOpen}>
                <Landmark /> Thêm tài khoản
              </Button>
            </ToolbarActions>
          </Toolbar>
        </PageContainer>
        <PageContainer>
          <div className="page-content">
            <BankAccountTable />
          </div>
        </PageContainer>

        <EditBankAccountDialog
          form={form}
          mode="add"
          open={isAddOpen}
          isProcessing={false}
          onClose={handleAddClose}
          onProcess={handleOnAdd}
        />
      </Fragment>
    </BankAccountTableProvider>
  );
}
