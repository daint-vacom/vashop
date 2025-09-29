import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputCalendar } from '@/components/ui/inputs/input-calendar';
import { EditOrderSchemaType } from '../../schemas/edit-order.schema';

interface Props {
  form: UseFormReturn<EditOrderSchemaType>;
}

export function OrderDetailDocumentCommonInfo({ form }: Props) {
  return (
    <Card className="basis-2/5">
      <CardHeader id="order-detail-document-common-info">
        <CardTitle className="text-primary">Chứng từ</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form role="form">
            <div className="grid grid-cols-2 form-spacing">
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
                      <Input
                        placeholder="Nhập số chứng từ"
                        {...field}
                        readOnly
                      />
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
                      <Input
                        placeholder="Nhập tham chiếu"
                        {...field}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
