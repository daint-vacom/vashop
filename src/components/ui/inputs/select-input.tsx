'use client';

import { ReactNode, useMemo, useState } from 'react';
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

interface Option<T = unknown> {
  value: string;
  label: string;
  searchableValue?: string;
  data?: T;
}

interface SelectSearchProps<T = unknown> {
  options?: Array<Option<T>>;
  renderOption?: (option: Option<T>) => ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  emptyMessage?: string;
  disabled?: boolean;
  modal?: boolean;
  enableSearch?: boolean;
  manualFilter?: boolean;
  onSelectOption?: (option: Option<T>) => void;
}

export function SelectInput<T>({
  options = [],
  renderOption = (option: Option<T>) => option.label,
  value,
  onChange,
  placeholder,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No options found.',
  disabled = false,
  className,
  modal,
  enableSearch = true,
  manualFilter = false,
  onSelectOption,
}: SelectSearchProps<T>) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const hasValue = options?.find((option) => option.value === value);

  const filteredOptions = useMemo(() => {
    if (manualFilter) return options;
    return options.filter((option) =>
      advancedSearch(option.searchableValue || option.value, searchValue),
    );
  }, [manualFilter, options, searchValue]);

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
        <Command shouldFilter={false}>
          {enableSearch && (
            <CommandInput
              className=""
              value={searchValue}
              onValueChange={setSearchValue}
            />
          )}
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {filteredOptions?.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.searchableValue || option.label || option.value}
                  onSelect={() => {
                    onChange(option.value === value ? '' : option.value);
                    onSelectOption?.(option);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'text-primary',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {renderOption(option)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
