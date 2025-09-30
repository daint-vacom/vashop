'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { advancedSearch } from '@/lib/search';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input, type InputProps } from '@/components/ui/inputs/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Option<TData = unknown> {
  value: string;
  data?: TData;
  searchableValue?: string;
}

interface SuggestionInputProps<TData = unknown> extends InputProps {
  options?: Array<Option<TData>>;
  renderOption: (option: Option<TData>) => ReactNode;
  searchPlaceholder?: string;
  emptyMessage?: string;
  modal?: boolean;
  manualFilter?: boolean;
  onSelectOption?: (option: Option<TData>) => void;
}

export function SuggestionInput<TData = unknown>({
  options = [],
  renderOption,
  value,
  onChange,
  placeholder,
  emptyMessage = 'Không tìm thấy giá trị',
  modal,
  manualFilter = false,
  onSelectOption,
  ...props
}: SuggestionInputProps<TData>) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(
    value ? String(value) : '',
  );

  // Keep internal inputValue in sync when parent/form updates the value
  // This ensures when other inputs write to the same form field the
  // suggestion input immediately reflects the change.
  useEffect(() => {
    const next = value ? String(value) : '';
    if (next !== inputValue) setInputValue(next);
    // we intentionally ignore inputValue in deps to avoid loop; compare inside
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options]);

  const filteredOptions = useMemo(() => {
    if (manualFilter) return options;
    return options.filter((option) =>
      advancedSearch(option.searchableValue || option.value, inputValue),
    );
  }, [manualFilter, options, inputValue]);

  const onInputBlur = () => {
    setTimeout(() => {
      if (!document.activeElement?.closest('[cmdk-list]')) {
        setOpen(false);
        if (
          !options.some((o) => (o.searchableValue || o.value) === inputValue)
        ) {
          onChange?.('');
          setInputValue('');
        }
      }
    }, 150);
  };

  const onSelectItem = (selectedValue: string) => {
    setInputValue(selectedValue);

    const option = options.find(
      (o) => (o.searchableValue || o.value) === selectedValue,
    );
    if (option) {
      onChange?.(option.value);
      onSelectOption?.(option);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={modal}>
      <PopoverTrigger asChild>
        <div className="relative flex-1">
          <Input
            placeholder={placeholder}
            value={inputValue}
            onChange={(val) => {
              setInputValue(val || '');
              onChange?.(val || '');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setOpen(false);
              } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                setOpen(true);
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            onFocus={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            onBlur={onInputBlur}
            {...props}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Command shouldFilter={false}>
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.searchableValue || option.value}
                  onMouseDown={(e) => e.preventDefault()}
                  onSelect={onSelectItem}
                >
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
