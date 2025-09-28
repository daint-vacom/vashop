import { useEffect, useState } from 'react';
import Breadcrumbs from '@/layouts/main-layout/components/breadcrumb';
import { UserDropdownMenu } from '@/layouts/main-layout/components/topbar/user-dropdown-menu';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { toAbsoluteUrl } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { PageContainer } from './containers/container';
import { SidebarMenu } from './sidebar-menu';

export function Header() {
  const [isSidebarSheetOpen, setIsSidebarSheetOpen] = useState(false);

  // const { statistics: notiStats } = useNoti();

  const { pathname } = useLocation();
  const mobileMode = useIsMobile();

  // Close sheet when route changes
  useEffect(() => {
    setIsSidebarSheetOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'header fixed top-0 z-10 start-0 flex items-stretch shrink-0 bg-background end-0 pe-[var(--removed-body-scroll-bar-size,0px)] border-b border-border',
      )}
    >
      <PageContainer className="flex justify-between items-stretch lg:gap-4">
        {/* HeaderLogo */}
        <div className="flex lg:hidden items-center gap-2.5">
          <Link to="/" className="shrink-0">
            <img
              src={toAbsoluteUrl('/media/logos/logo.png')}
              className="size-6"
              alt="mini-logo"
            />
          </Link>
          <div className="flex items-center">
            {mobileMode && (
              <Sheet
                open={isSidebarSheetOpen}
                onOpenChange={setIsSidebarSheetOpen}
              >
                <SheetTrigger asChild>
                  <Button variant="ghost" mode="icon">
                    <Menu className="text-muted-foreground/70" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  className="p-0 gap-0 w-[275px]"
                  side="left"
                  close={false}
                >
                  <SheetHeader className="p-0 space-y-0" />
                  <SheetBody className="p-0 overflow-y-auto pt-7.5">
                    <div className="overflow-hidden">
                      <div className="w-(--sidebar-default-width)">
                        <SidebarMenu />
                      </div>
                    </div>
                  </SheetBody>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>

        {/* Main Content (MegaMenu or Breadcrumbs) */}
        <Breadcrumbs />

        {/* HeaderTopbar */}
        <div className="flex items-center gap-5">
          <>
            {/* <NotificationsSheet
              trigger={
                <BadgeContainer>
                  <Button
                    variant="ghost"
                    mode="icon"
                    shape="circle"
                    className="hover:bg-primary/10 hover:[&_svg]:text-primary"
                  >
                    <Bell className="size-4.5!" />
                  </Button>
                  {notiStats.unread > 0 && (
                    <BadgeIndicator>
                      <Badge size="xs" shape="circle" variant="destructive">
                        {notiStats.unread}
                      </Badge>
                    </BadgeIndicator>
                  )}
                </BadgeContainer>
              }
            /> */}
            <UserDropdownMenu
              trigger={
                <img
                  className="size-9 rounded-full border-2 border-green-500 shrink-0 cursor-pointer"
                  src={toAbsoluteUrl('/media/avatars/300-2.png')}
                  alt="User Avatar"
                />
              }
            />
          </>
        </div>
      </PageContainer>
    </header>
  );
}
