import { useMemo, useState } from 'react';
import { Funnel } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { BadgeContainer } from '../../badge';
import {
  CustomSelect,
  CustomSelectProps,
  SelectOption,
} from '../../custom-select';
import { useColumnHeader } from '../providers/column-header-provider';

interface Props<T = unknown>
  extends Omit<CustomSelectProps<T>, 'value' | 'onChange'> {
  enableColumnFilter?: boolean;

  // when enableColumnFilter is false, use this value as the selected value
  value?: string;
}

export function ColumnActionSelect<T>({
  enableColumnFilter = true,
  value,
  onSelectOption,
  ...props
}: Props<T>) {
  const { title, column } = useColumnHeader();

  const [open, setOpen] = useState(false);

  const selectedOption = useMemo(() => {
    if (enableColumnFilter) return (column.getFilterValue() as string) || '';
    return value || '';
  }, [enableColumnFilter, value, column]);

  const handleSelect = (option: SelectOption<T> | undefined) => {
    if (enableColumnFilter)
      column.setFilterValue(option?.value ? option.value : '');
    else onSelectOption?.(option);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <BadgeContainer>
          <Button
            mode="icon"
            size="sm"
            variant="ghost"
            className="size-7"
            title={`Lọc ${title}`}
            aria-label={`Lọc ${title}`}
          >
            {/** show funnel in primary color when a filter is active */}
            <Funnel className={cn(selectedOption ? 'text-primary' : '')} />
          </Button>
        </BadgeContainer>
      </PopoverTrigger>
      <PopoverContent className="w-column-action-menu p-0" align="end">
        <CustomSelect
          value={selectedOption}
          onSelectOption={handleSelect}
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}
