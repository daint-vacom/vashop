import { ReactNode } from 'react';
import { useAuth } from '@/features/auth/context/auth-context';
import { ROUTE_PATHS } from '@/routing/paths';
import { RotateCcwKey } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function UserDropdownMenu({ trigger }: { trigger: ReactNode }) {
  const { logout } = useAuth();

  // Use display data from currentUser
  const displayName = '???';

  const displayEmail = '???';
  // const displayAvatar = user?.pic || toAbsoluteUrl('/media/avatars/300-2.png');
  const displayAvatar = toAbsoluteUrl('/media/avatars/300-2.png');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" side="bottom" align="end">
        {/* Header */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <img
              className="size-9 rounded-full border-2 border-green-500"
              src={displayAvatar}
              alt="User avatar"
            />
            <div className="flex flex-col">
              <Link
                to="#"
                className="text-sm text-mono hover:text-primary font-semibold"
              >
                {displayName}
              </Link>
              <a
                href={`mailto:${displayEmail}`}
                className="text-xs text-muted-foreground hover:text-primary"
              >
                {displayEmail}
              </a>
            </div>
          </div>
          {/* <Badge variant="primary" appearance="light" size="sm">
            Pro
          </Badge> */}
        </div>

        <DropdownMenuSeparator />

        {/* Menu Items */}
        <DropdownMenuItem asChild>
          <Link
            to={ROUTE_PATHS.CHANGE_PASSWORD}
            className="flex items-center gap-2"
          >
            <RotateCcwKey />
            Đổi Mật Khẩu
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <div className="p-2 mt-1">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={logout}
          >
            Đăng Xuất
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
