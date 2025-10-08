import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { UseTableColumnProps } from '@/components/ui/tables/columns/table-column.config';
import { DataGridColumnHeader } from '@/components/ui/tables/data-grid-column-header';
import { ImageCell } from '../../cells/image-cells';

interface Props<T> extends UseTableColumnProps {
  getImageUrl: (row: T) => string | undefined | null;
  renderCell?: (imageUrl: string | undefined | null) => React.ReactNode;
}

export function useImageColumn<T>({
  getImageUrl,
  renderCell = (imageUrl) => <ImageCell imageUrl={imageUrl} />,
  id = 'image',
  headerTitle = 'Image',
  size = 100,
}: Props<T>): ColumnDef<T> {
  return useMemo<ColumnDef<T>>(
    () => ({
      id,
      header: ({ column }) => (
        <DataGridColumnHeader title={headerTitle} column={column} />
      ),
      cell: ({ row }) => renderCell(getImageUrl(row.original)),
      meta: {
        headerTitle,
      },

      size,
    }),
    [getImageUrl, headerTitle, id, renderCell, size],
  );
}
