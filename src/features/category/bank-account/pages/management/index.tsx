import { Fragment, useEffect, useState } from 'react';
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
import {
  useAddBankAccountMutation,
  useBankAccountListQuery,
  useEditBankAccountMutation,
} from '../../hooks/use-bank-account-list-query';
import IBankAccount from '../../models/bank-account.model';
import { BankAccountTableProvider } from '../../providers/bank-account-table.provider';
import {
  editBankAccountSchema,
  EditBankAccountSchemaType,
} from '../../schemas/edit-bank-account.schema';
import { BankAccountTable } from './components/bank-account-table';
import { EditBankAccountDialog } from './components/edit-bank-account-dialog';

export function BankAccountManagementPage() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<IBankAccount | null>(null);

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

  useEffect(() => {
    if (selectedRow) {
      form.reset({
        accNbr: selectedRow.accNbr,
        name: selectedRow.name,
        owner: selectedRow.owner,
        branch: selectedRow.branch,
        bankCode: selectedRow.bankCode,
      });
    } else {
      form.reset(getFormDefaultValues());
    }
  }, [form, selectedRow]);

  const bankAccountList = useBankAccountListQuery();

  const { mutate: addBankAccount, status: addStatus } =
    useAddBankAccountMutation({
      onSuccess: () => {
        bankAccountList.refetch(1);
        handleEditClose();
        setTimeout(() => {
          // To avoid form reset before dialog close animation completed
          form.reset(getFormDefaultValues());
        }, 100);
      },
    });

  const { mutate: editBankAccount, status: editStatus } =
    useEditBankAccountMutation({
      onSuccess: () => {
        bankAccountList.refetch();
        handleEditClose();
      },
    });

  const handleAddOpen = () => {
    setSelectedRow(null);
    setIsEditOpen(true);
  };

  const handleEditOpen = (row: IBankAccount) => {
    setSelectedRow(row);
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setTimeout(() => {
      // To avoid form reset before dialog close animation completed
      setSelectedRow(null);
    }, 100);
  };

  const handleOnEdit = (data: EditBankAccountSchemaType) => {
    if (selectedRow) {
      editBankAccount({ id: selectedRow.id, payload: data });
    } else {
      addBankAccount(data);
    }
  };

  return (
    <BankAccountTableProvider value={bankAccountList}>
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
            <BankAccountTable onEdit={handleEditOpen} />
          </div>
        </PageContainer>

        <EditBankAccountDialog
          form={form}
          mode={selectedRow ? 'edit' : 'add'}
          open={isEditOpen}
          isProcessing={addStatus === 'pending' || editStatus === 'pending'}
          onClose={handleEditClose}
          onProcess={handleOnEdit}
        />
      </Fragment>
    </BankAccountTableProvider>
  );
}
