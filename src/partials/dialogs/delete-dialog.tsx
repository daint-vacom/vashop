import { PropsWithChildren } from 'react';
import { LoaderCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export interface DeleteDialogProps {
  title?: string;
  open: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export function DeleteDialog({
  title,
  children,
  isDeleting,
  open,
  onClose,
  onDelete,
}: PropsWithChildren<DeleteDialogProps>) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 space-y-0 max-w-2xl max-h-dialog flex flex-col">
        <DialogHeader className="py-5 m-0 px-5">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="separator" />
        <div className="px-5 py-5 text-sm text-foreground">{children}</div>

        <div className="separator" />
        <div className="flex gap-2.5 px-5 py-5 justify-end">
          <Button variant="outline" size="lg" onClick={onClose}>
            Hủy
          </Button>
          <Button
            variant="destructive"
            size="lg"
            className="max-w-full"
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="flex items-center gap-2">
                <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Đang xóa
              </span>
            ) : (
              'Xóa'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
