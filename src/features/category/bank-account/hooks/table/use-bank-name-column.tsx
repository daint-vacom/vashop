import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { wrapEmptyCodeString } from '@/lib/codes/data_codes';
import { LabelDescriptionTableCell } from '@/components/ui/tables/cells/label_description';
import { UseTableColumnProps } from '@/components/ui/tables/columns/table-column.config';
import { DataGridColumnHeader } from '@/components/ui/tables/data-grid-column-header';
import { ColumnActionSelect } from '@/components/ui/tables/header-actions/select';
import IBank from '../../models/bank.model';
import { useBankListQuery } from '../use-bank-list-query';

interface Props<T> extends UseTableColumnProps {
  getBank: (row: T) => Partial<IBank> | undefined;
  selectedValue?: string;
  onChange?: (bank: IBank | undefined) => void;
}

export function useBankNameColumn<T>({
  getBank,
  selectedValue,
  onChange,
  id = 'bank',
  headerTitle = 'Ngân Hàng',
}: Props<T>): ColumnDef<T> {
  const { data: banks } = useBankListQuery();

  return useMemo<ColumnDef<T>>(
    () => ({
      id: id,
      header: ({ column }) => (
        <DataGridColumnHeader
          title={headerTitle}
          column={column}
          filter={
            <ColumnActionSelect
              options={banks?.map((bank) => ({
                label: bank.name,
                value: bank.code,
                searchableValue: `${bank.code} ${bank.name}`,
                data: bank,
              }))}
              searchPlaceholder="Tìm ngân hàng..."
              enableColumnFilter={false}
              value={selectedValue}
              onSelectOption={(option) => onChange?.(option?.data)}
            />
          }
        />
      ),
      filterFn: (row, _, filterValue) => {
        if (!filterValue || filterValue.length === 0) return true;
        const code = getBank(row.original)?.code;
        return filterValue.includes(wrapEmptyCodeString(code));
      },
      cell: ({ row }) => (
        <LabelDescriptionTableCell
          label={getBank(row.original)?.name}
          description={getBank(row.original)?.code}
        />
      ),
      meta: {
        headerTitle: headerTitle,
      },
    }),
    [banks, getBank, headerTitle, id, onChange, selectedValue],
  );
}
