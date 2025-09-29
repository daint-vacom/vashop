import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const labelVariants = cva('text-sm text-secondary-foreground', {
  variants: {
    size: {
      lg: 'w-[160px]',
      md: 'w-[120px]',
      sm: 'w-[80px]',
      full: 'w-full',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

function DetailInfo({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex gap-x-2 max-w-full', className)} {...props} />
  );
}

function DetailInfoLabel({
  className,
  size,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof labelVariants>) {
  return <div className={cn(labelVariants({ size }), className)} {...props} />;
}

const contentVariants = cva('text-sm text-mono font-medium shrink-0', {
  variants: {
    align: {
      right: 'text-right',
      left: 'text-left',
      center: 'text-center',
    },
  },
  defaultVariants: {
    align: 'left',
  },
});

function DetailInfoContent({
  className,
  align,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof contentVariants>) {
  return (
    <div className={cn(contentVariants({ align }), className)} {...props} />
  );
}

export { DetailInfo, DetailInfoLabel, DetailInfoContent };
