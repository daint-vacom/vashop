import { ColumnDef } from '@tanstack/react-table';
import { toAbsoluteUrl } from '@/lib/helpers';
import { useImageColumn } from '@/components/ui/tables/columns/hooks/use-image-column';

export function useBankLogoColumn<T>(
  getBankCode: (row: T) => string | undefined | null,
): ColumnDef<T> {
  return useImageColumn<T>({
    getImageUrl: (row) =>
      toAbsoluteUrl(`/media/banks/${getBankCode(row)}.webp`),
    id: 'bankLogo',
    headerTitle: '',
  });
}
