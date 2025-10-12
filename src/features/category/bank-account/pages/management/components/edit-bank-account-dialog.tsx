import { LoaderCircleIcon, Save } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/inputs/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FormDialogProps } from '@/components/partials/dialogs/dialog-props';
import { BankSelectInput } from '../../../components/bank-select-input';
import IBank from '../../../models/bank.model';
import { EditBankAccountSchemaType } from '../../../schemas/edit-bank-account.schema';

interface Props extends FormDialogProps<EditBankAccountSchemaType> {
  mode?: 'add' | 'edit';
}

export function EditBankAccountDialog({
  form,
  mode = 'edit',
  open,
  isProcessing,
  onClose,
  onProcess,
}: Props) {
  async function onSubmit(values: EditBankAccountSchemaType) {
    onProcess(values);
  }

  const onError = (err: any) => {
    console.log('❌ Lỗi form:', err);
    console.log('form', form.getValues());
  };

  const handleOnBankChange = (
    field: ControllerRenderProps<EditBankAccountSchemaType, 'name'>,
    bank: IBank | undefined,
  ) => {
    field.onChange(bank?.name ?? '');
    form.setValue('bankCode', bank?.code ?? '');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="p-0 space-y-0 max-w-2xl max-h-dialog flex flex-col"
        aria-labelledby="payroll-dialog-title"
      >
        <DialogHeader className="py-5 m-0 px-5">
          <DialogTitle id="payroll-dialog-title">
            {mode === 'add' ? 'Thêm' : 'Chỉnh sửa'} tài khoản ngân hàng
          </DialogTitle>
        </DialogHeader>
        <div className="separator" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            role="form"
            className="flex-1 min-h-0 flex flex-col"
          >
            <ScrollArea>
              <div className="grid grid-cols-2 gap-5 px-5 py-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel required>Ngân hàng</FormLabel>
                      <FormControl>
                        <BankSelectInput
                          value={field.value?.toString() || ''}
                          onSelectOption={(option) =>
                            handleOnBankChange(field, option?.data)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accNbr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Số tài khoản</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập số tài khoản ngân hàng..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="owner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Tên chủ tài khoản</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập tên chủ tài khoản..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <div className="separator" />
            <div className="flex gap-2.5 px-5 py-5 justify-end">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="max-w-full"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <LoaderCircleIcon
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />{' '}
                    {mode === 'add' ? 'Đang thêm' : 'Đang cập nhật'}
                  </span>
                ) : mode === 'add' ? (
                  'Thêm'
                ) : (
                  <>
                    <Save /> Cập nhật
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
