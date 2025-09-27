import { LoaderCircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PageLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center grow w-full h-full pb-[var(--header-height)]',
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <LoaderCircleIcon className="animate-spin text-muted-foreground opacity-50" />
        <span className="text-muted-foreground font-medium text-sm">
          Đang tải dữ liệu...
        </span>
      </div>
    </div>
  );
}
