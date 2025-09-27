'use client';

import { toAbsoluteUrl } from '@/lib/helpers';

export function ScreenLoader() {
  return (
    <div className="flex flex-col items-center gap-4 justify-center fixed inset-0 z-50 transition-opacity duration-700 ease-in-out">
      <img
        className="h-10 max-w-none"
        src={toAbsoluteUrl('/media/logos/evn-genco3-no-text.png')}
        alt="logo"
      />
      <div className="text-muted-foreground font-medium text-sm">
        Đang tải dữ liệu...
      </div>
    </div>
  );
}
