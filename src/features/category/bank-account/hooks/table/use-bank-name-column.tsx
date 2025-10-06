import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { wrapEmptyCodeString } from '@/lib/codes/data_codes';
import { DataGridColumnHeader } from '@/components/ui/tables/data-grid-column-header';
import { ColumnActionMultiSelect } from '@/components/ui/tables/header-actions/multi-select';
import IBank from '../../models/bank.model';
import { useBankListQuery } from '../use-bank-list-query';

export function useBankNameColumn<T>(
  getBank: (row: T) => Partial<IBank> | undefined,
): ColumnDef<T> {
  const { data: banks } = useBankListQuery();

  return useMemo<ColumnDef<T>>(
    () => ({
      id: 'bank',
      header: ({ column }) => (
        <DataGridColumnHeader
          title="Ngân Hàng"
          column={column}
          filter={
            <ColumnActionMultiSelect
              options={banks?.map((a) => ({
                label: a.name,
                value: a.code,
                searchableValue: `${a.code} ${a.name}`,
              }))}
            />
          }
        />
      ),
      filterFn: (row, _, filterValue) => {
        if (!filterValue || filterValue.length === 0) return true;
        const code = getBank(row.original)?.code;
        return filterValue.includes(wrapEmptyCodeString(code));
      },
      cell: ({ row }) => <span>{getBank(row.original)?.name}</span>,
      meta: {
        headerTitle: 'Ngân Hàng',
      },
    }),
    [banks, getBank],
  );
}
