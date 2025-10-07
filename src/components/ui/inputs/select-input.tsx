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
import { CustomSelect, CustomSelectProps } from '../custom-select';

interface SelectSearchProps<T = unknown> extends CustomSelectProps<T> {
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  modal?: boolean;
}

export function SelectInput<T>({
  options = [],
  value,
  placeholder,
  disabled = false,
  className,
  modal,
  onChange,
  ...props
}: SelectSearchProps<T>) {
  const [open, setOpen] = useState(false);

  const hasValue = options?.find((option) => option.value === value);

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
              'flex-1 text-left min-w-0 justify-start truncate',
              !hasValue && 'text-muted-foreground',
            )}
          >
            {hasValue
              ? options?.find((option) => option.value === value)?.label
              : placeholder}
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
