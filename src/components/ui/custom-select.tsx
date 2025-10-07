'use client';

import { ReactNode, useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { advancedSearch } from '@/lib/search';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

export interface SelectOption<T = unknown> {
  value: string;
  label: string;
  tooltip?: string;
  searchableValue?: string;
  data?: T;
}

export interface CustomSelectProps<T = unknown> {
  options?: Array<SelectOption<T>>;
  renderOption?: (option: SelectOption<T>) => ReactNode;
  value: string;
  onChange?: (value: string) => void;
  searchPlaceholder?: string;
  emptyMessage?: string;
  enableSearch?: boolean;
  manualFilter?: boolean;
  onSelectOption?: (option: SelectOption<T> | undefined) => void;
}

export function CustomSelect<T>({
  options = [],
  renderOption = (option: SelectOption<T>) => option.label,
  value,
  onChange,
  searchPlaceholder = 'Tìm dữ liệu...',
  emptyMessage = 'Không có kết quả',
  enableSearch = true,
  manualFilter = false,
  onSelectOption,
}: CustomSelectProps<T>) {
  const [searchValue, setSearchValue] = useState('');

  const filteredOptions = useMemo(() => {
    if (manualFilter) return options;
    return options.filter((option) =>
      advancedSearch(option.searchableValue || option.value, searchValue),
    );
  }, [manualFilter, options, searchValue]);

  return (
    <Command shouldFilter={false}>
      {enableSearch && (
        <CommandInput
          placeholder={searchPlaceholder}
          className="h-9"
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
                const isSameValue = option.value === value;
                onChange?.(isSameValue ? '' : option.value);
                onSelectOption?.(isSameValue ? undefined : option);
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
  );
}
