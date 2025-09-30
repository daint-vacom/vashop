import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/inputs/input.tsx';
import { SelectInput } from '@/components/ui/inputs/select-input.tsx';
import { SuggestionInput } from '@/components/ui/inputs/suggestion-input.tsx';
import { useOrderDetail } from '../../providers/order-detail-provider.tsx';

export function OrderDetailGeneralInfo() {
  const { form } = useOrderDetail();
  return (
    <Card className="basis-3/5">
      <CardHeader id="order-detail-general-info">
        <CardTitle>Thông tin chung</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 form-spacing">
        <FormField
          control={form.control}
          name="test"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Mã đối tác</FormLabel>
              <FormControl>
                <div className="flex gap-2.5">
                  <SuggestionInput
                    placeholder="Nhập mã đối tác"
                    {...field}
                    options={[
                      {
                        data: 'NCC001 - Công ty TNHH Thương Mại Dịch Vụ ABC',
                        value: 'NCC001ABC',
                      },
                      {
                        data: 'NCC002 - Công ty Cổ Phần XYZ',
                        value: 'NCC002',
                      },
                    ]}
                    renderOption={(option) => option.data}
                  />
                  <Button
                    variant={'secondary'}
                    size={'icon'}
                    title="Thêm đối tác mới"
                  >
                    <Plus />
                  </Button>
                </div>
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
                <div className="flex gap-2.5">
                  <Input placeholder="Nhập tên đối tác" {...field} />
                  <Button
                    variant={'secondary'}
                    size={'icon'}
                    title="Thêm đối tác mới"
                  >
                    <Plus />
                  </Button>
                </div>
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
                <SelectInput
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
      </CardContent>
    </Card>
  );
}
