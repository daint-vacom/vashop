import { PropsWithChildren } from 'react';
import { TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SimpleDialogProps } from '@/components/partials/dialogs/dialog-props';

export interface WarningDialogProps extends SimpleDialogProps {
  title: string;
}

export function WarningDialog({
  open,
  onClose,
  title,
  children,
}: PropsWithChildren<WarningDialogProps>) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 space-y-0 max-w-2xl max-h-dialog flex flex-col">
        <DialogHeader className="py-5 m-0 px-5">
          <DialogTitle className="flex gap-x-2.5">
            <TriangleAlert size={20} className="text-warning shrink-0" />{' '}
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="separator" />
        <div className="px-5 py-5 text-sm text-foreground">{children}</div>
        <div className="separator" />
        <div className="flex gap-2.5 px-5 py-5 justify-end">
          <Button variant="outline" size="lg" onClick={onClose}>
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
