import { toAbsoluteUrl } from '@/lib/helpers';

export function SidebarHeader() {
  return (
    <div className="flex shrink-0 justify-center pl-1 pr-3">
      <img
        src={toAbsoluteUrl('/media/logos/logo-full-crop.png')}
        className="default-logo h-8 w-full"
        alt="Default Logo"
      />
      <img
        src={toAbsoluteUrl('/media/logos/logo.png')}
        className="small-logo size-8 max-w-none"
        alt="Mini Logo"
      />
    </div>
  );
}
