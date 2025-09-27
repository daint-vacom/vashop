import { toAbsoluteUrl } from '@/lib/helpers';

export function SidebarHeader() {
  return (
    <div className="flex shrink-0 justify-center pl-1 pr-3">
      <img
        src={toAbsoluteUrl('/media/logos/evn-genco3-vertical.webp')}
        className="default-logo w-full"
        alt="Default Logo"
      />
      <img
        src={toAbsoluteUrl('/media/logos/evn-genco3-no-text.png')}
        className="small-logo h-[22px] max-w-none"
        alt="Mini Logo"
      />
    </div>
  );
}
