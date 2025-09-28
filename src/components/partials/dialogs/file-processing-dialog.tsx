import { PropsWithChildren } from 'react';
import { SingleFileUploadSchemaType } from '@/schemas/types/file.schema';
import { LoaderCircleIcon } from 'lucide-react';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { SingleFileUpload } from '@/components/ui/single-file-upload';
import { FormDialogProps } from '@/components/partials/dialogs/dialog-props';

interface Props extends FormDialogProps<SingleFileUploadSchemaType> {
  canEdit?: boolean;
  title?: string;
}

export function FileProcessingDialog({
  canEdit = true,
  form,
  isProcessing,
  open,
  onClose,
  onProcess,
  title = 'Nhập File',
  children,
}: PropsWithChildren<Props>) {
  async function onSubmit(values: SingleFileUploadSchemaType) {
    console.log('Form Values:', values); // Log form values
    onProcess(values);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 space-y-0 max-w-2xl max-h-dialog flex flex-col">
        <DialogHeader className="py-5 m-0 px-5">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="separator" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            role="form"
            className="flex-1 min-h-0 flex flex-col"
          >
            <ScrollArea>
              <div className="flex flex-col gap-5 p-5">
                {children}
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel required>File</FormLabel>
                      <FormControl>
                        <SingleFileUpload {...field} readOnly={!canEdit} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            {canEdit && (
              <>
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
                        />
                        Đang xác nhận
                      </span>
                    ) : (
                      'Xác Nhận'
                    )}
                  </Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
