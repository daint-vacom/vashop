import { Outlet } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

export function BrandedLayout() {
  return (
    <>
      <div className="flex flex-col items-center justify-center grow bg-gradient-to-br from-red-500 to-orange-400">
        <Card className="w-full max-w-[400px]">
          <CardContent className="p-10 relative">
            <Outlet />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
