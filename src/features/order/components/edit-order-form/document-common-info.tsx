import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputCalendar } from '@/components/ui/inputs/input-calendar';
import { useOrderDetail } from '../../providers/order-detail-provider.tsx';

export function OrderDetailDocumentCommonInfo() {
  const { form } = useOrderDetail();
  return (
    <Card className="basis-2/5">
      <CardHeader id="order-detail-document-common-info">
        <CardTitle>Chứng từ</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 form-spacing">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Ngày chứng từ</FormLabel>
              <FormControl>
                <InputCalendar {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="test"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Số chứng từ</FormLabel>
              <FormControl>
                <Input placeholder="Nhập số chứng từ" {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="test"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel required>Số hóa đơn</FormLabel>
              <FormControl>
                <Input placeholder="Nhập số hóa đơn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="test"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel required>Tham chiếu</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tham chiếu" {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
