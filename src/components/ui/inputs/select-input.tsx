'use client';

import { useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  CustomSelect,
  CustomSelectProps,
  SelectOption,
} from '../custom-select';

interface SelectSearchProps<T = unknown> extends CustomSelectProps<T> {
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  modal?: boolean;
  trigger?: (option: SelectOption<T> | undefined) => React.ReactNode;
}

export function SelectInput<T>({
  options = [],
  value,
  placeholder,
  disabled = false,
  className,
  modal,
  onChange,
  trigger = (option) => <span className="truncate">{option?.label}</span>,
  ...props
}: SelectSearchProps<T>) {
  const [open, setOpen] = useState(false);

  const selectedValue = options?.find((option) => option.value === value);

  const handleChange = (val: string) => {
    onChange?.(val);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={modal}>
      <PopoverTrigger asChild data-slot="select-trigger">
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            'justify-between text-foreground data-placeholder:text-muted-foreground font-normal',
            className,
          )}
          disabled={disabled}
        >
          <div
            className={cn(
              'flex-1 flex gap-x-2 min-w-0 justify-start items-center truncate',
              !selectedValue && 'text-muted-foreground',
            )}
          >
            {selectedValue ? trigger(selectedValue) : placeholder}
          </div>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <CustomSelect
          value={value}
          options={options}
          onChange={handleChange}
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}
