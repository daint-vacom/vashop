'use client';

import { useEffect, useState } from 'react';
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

  // Scroll to selected option when popover opens
  useEffect(() => {
    if (open && selectedValue) {
      // Wait for the next tick to ensure the DOM is rendered
      setTimeout(() => {
        // Find all command items in the document
        const commandItems = document.querySelectorAll('[cmdk-item]');
        let selectedElement: HTMLElement | null = null;

        // Find the selected item by checking the value
        for (const item of commandItems) {
          const element = item as HTMLElement;
          // Check if this item has the check icon visible (opacity-100)
          const checkIcon = element.querySelector('.text-primary.opacity-100');
          if (checkIcon) {
            selectedElement = element;
            break;
          }
        }

        if (selectedElement) {
          // Find the parent scrollable container
          const commandList = selectedElement.closest(
            '[cmdk-list]',
          ) as HTMLElement;
          if (commandList) {
            // Calculate the scroll position to center the selected item
            const scrollTop =
              selectedElement.offsetTop -
              commandList.clientHeight / 2 +
              selectedElement.offsetHeight / 2;

            commandList.scrollTo({
              top: Math.max(0, scrollTop),
            });
          }
        }
      }, 100);
    }
  }, [open, selectedValue]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={modal}>
      <PopoverTrigger asChild data-slot="select-trigger">
        <Button
          variant="outline"
          mode="input"
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
