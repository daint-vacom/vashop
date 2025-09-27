'use client';

import { ReactNode, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { advancedSearch } from '@/lib/search';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Option {
  value: string;
  label: string;
  data?: any;
}

interface SelectSearchProps {
  options?: Array<Option>;
  buildItem?: (option: Option) => ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  emptyMessage?: string;
  disabled?: boolean;
  modal?: boolean;
}

export function SelectSearch({
  options,
  buildItem = (option) => option.label,
  value,
  onChange,
  placeholder,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No options found.',
  disabled = false,
  modal,
}: SelectSearchProps) {
  const [open, setOpen] = useState(false);

  const hasValue = options?.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={modal}>
      <PopoverTrigger asChild data-slot="select-trigger">
        <Button
          variant="outline"
          role="combobox"
          className="justify-between text-foreground data-placeholder:text-muted-foreground font-normal"
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
        <Command
          filter={(value, search) => (advancedSearch(value, search) ? 1 : 0)}
        >
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    onChange(option.value === value ? '' : option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'text-primary',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {buildItem(option)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
