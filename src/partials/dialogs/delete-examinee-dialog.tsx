import {
  DeleteDialog,
  DeleteDialogProps,
} from '@/partials/dialogs/delete-dialog';

interface Props extends DeleteDialogProps {
  examineeName?: string;
}

export function DeleteExamineeDialog(props: Props) {
  return (
    <DeleteDialog {...props} title={`Xóa Thí Sinh - ${props.examineeName}`}>
      <span className="text-destructive font-medium">CẢNH BÁO:</span> Sau khi
      xóa không thể hoàn tác. Xác nhận xóa thí sinh?
    </DeleteDialog>
  );
}
