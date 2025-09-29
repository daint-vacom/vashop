import { cn } from '@/lib/utils';
import { Input, InputProps } from '../input';

interface Props extends InputProps {
  heading?: React.ReactNode;
  trailing?: React.ReactNode;
}

export function IconInput({ className, heading, trailing, ...props }: Props) {
  return (
    <div className="relative">
      {heading && (
        <div className="absolute left-0 top-0 h-full text-muted-foreground text-sm font-semibold inline-flex items-center pl-3 rounded-md [&_svg:not([class*=size-])]:size-4 shrink-0">
          {heading}
        </div>
      )}
      <Input
        className={cn(heading && 'pl-7', trailing && 'pr-7', className)}
        {...props}
      />
      {trailing && (
        <div className="absolute right-0 top-0 h-full text-muted-foreground text-sm font-semibold inline-flex items-center pr-3 rounded-md [&_svg:not([class*=size-])]:size-4 shrink-0">
          {trailing}
        </div>
      )}
    </div>
  );
}
