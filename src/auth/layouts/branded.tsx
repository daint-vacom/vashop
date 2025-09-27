import { Link, Outlet } from 'react-router-dom';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Card, CardContent } from '@/components/ui/card';

export function BrandedLayout() {
  return (
    <>
      <style>
        {`
          .page-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1200/bg-10.png')}');
          }
          .dark .page-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1200/bg-10-dark.png')}');
          }
        `}
      </style>
      <div className="grid lg:grid-cols-2 grow bg-center bg-no-repeat page-bg lg:p-25 gap-5">
        <div className="flex flex-col gap-2.5 justify-center items-center">
          <img
            src={toAbsoluteUrl('/media/logos/evn-genco3-vertical.webp')}
            className="h-[120px] max-w-none"
            alt=""
          />
        </div>
        <div className="flex justify-center items-center order-2 lg:order-1">
          <Card className="w-full max-w-[400px]">
            <CardContent className="p-10 relative">
              <Outlet />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
