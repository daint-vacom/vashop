import { cn } from '@/lib/utils';
import { SelectInput } from '@/components/ui/inputs/select-input';
import { AvatarCell } from '@/components/ui/tables/cells/person';
import { useBankListQuery } from '../hooks/use-bank-list-query';
import IBank from '../models/bank.model';

export function BankSelectInput({
  className,
  ...props
}: React.ComponentProps<typeof SelectInput<IBank>>) {
  const { data: bankList } = useBankListQuery();

  return (
    <SelectInput
      modal={true}
      placeholder="Chọn ngân hàng"
      searchPlaceholder="Tìm ngân hàng..."
      emptyMessage="Không tìm thấy"
      aria-label="Chọn ngân hàng"
      options={bankList?.map((bank) => ({
        value: bank.name,
        label: bank.name,
        data: bank,
        searchableValue: `${bank.name} ${bank.code}`,
      }))}
      renderOption={(option) => {
        const bank = option.data;
        return (
          <AvatarCell
            imageUrl={''}
            name={bank?.name ?? ''}
            description={bank?.code ?? ''}
          />
        );
      }}
      trigger={(option) => {
        const bank = option?.data;
        return (
          <AvatarCell
            imageUrl={''}
            name={bank?.name ?? ''}
            description={bank?.code ?? ''}
          />
        );
      }}
      className={cn('h-16', className)}
      {...props}
    />
  );
}
