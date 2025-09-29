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
import { SelectSearch } from '@/components/ui/select-search';
import { EditOrderSchemaType } from '../../schemas/edit-order.schema';

interface Props {
  form: UseFormReturn<EditOrderSchemaType>;
}

export function OrderDetailGeneralInfo({ form }: Props) {
  return (
    <Card className="basis-3/5">
      <CardHeader id="order-detail-general-info">
        <CardTitle className="text-primary">Thông tin chung</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form role="form">
            <div className="grid grid-cols-2 form-spacing">
              <FormField
                control={form.control}
                name="test"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Mã đối tác</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập mã đối tác" {...field} />
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
                    <FormLabel required>Tên đối tác</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên đối tác" {...field} />
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
                    <FormLabel required>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập địa chỉ" {...field} />
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
                    <FormLabel required>Kho</FormLabel>
                    <FormControl>
                      <SelectSearch
                        modal={true}
                        placeholder="Chọn kho"
                        searchPlaceholder="Tìm kho..."
                        emptyMessage="Không tìm thấy"
                        options={[
                          {
                            label: 'A',
                            value: 'a',
                          },
                          {
                            label: 'B',
                            value: 'b',
                          },
                        ]}
                        value={field.value || ''}
                        onChange={field.onChange}
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
                    <FormLabel required>Diễn giải</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập diễn giải"
                        aria-label="Nhập diễn giải"
                        {...field}
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
