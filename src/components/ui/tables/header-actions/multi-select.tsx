import { useEffect, useMemo, useState } from 'react';
import { Funnel } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MultiSelect, type MultiOption } from '@/components/ui/multi-select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge, BadgeContainer, BadgeIndicator } from '../../badge';
import { useColumnHeader } from '../providers/column-header-provider';

interface Props {
  options?: MultiOption[];
}

export function ColumnActionMultiSelect({ options }: Props) {
  const { title, column } = useColumnHeader();

  const [open, setOpen] = useState(false);

  const selectedOptions = useMemo(() => {
    return column.getFilterValue() as string[];
  }, [column.getFilterValue()]);

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
            <Funnel className={cn(selectedOptions ? 'text-primary' : '')} />
            {selectedOptions && (
              <BadgeIndicator align="bottom-right" className="bottom-2">
                <Badge size="xs" shape="circle" variant="destructive">
                  {selectedOptions.length}
                </Badge>
              </BadgeIndicator>
            )}
          </Button>
        </BadgeContainer>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="end">
        <MultiSelect
          title={title}
          options={options ?? []}
          value={selectedOptions}
          onChange={(values) =>
            column.setFilterValue(values?.length ? values : undefined)
          }
        />
      </PopoverContent>
    </Popover>
  );
}
