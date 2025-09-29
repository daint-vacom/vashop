import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Resolver } from 'react-hook-form';
import { Form } from '@/components/ui/form.tsx';
import { OrderDetailProvider } from '../../providers/order-detail-provider.tsx';
import {
  editOrderSchema,
  EditOrderSchemaType,
} from '../../schemas/edit-order.schema';
import { OrderDetailDocumentCommonInfo } from './document-common-info';
import { OrderDetailDocumentDetail } from './document-detail';
import { OrderDetailGeneralInfo } from './general-info';
import { OrderDetailSummary } from './summary';

export function OrderDetailForm() {
  const form = useForm<EditOrderSchemaType>({
    // zodResolver generic compatibility can be tricky with some date transforms.
    // Cast to Resolver with the target schema type to satisfy typings.
    resolver: zodResolver(
      editOrderSchema,
    ) as unknown as Resolver<EditOrderSchemaType>,
    defaultValues: {
      number: 0,
    },
  });

  const handleSubmit = (data: EditOrderSchemaType) => {};

  const onError = (err: any) => {
    console.log('❌ Lỗi form:', err);
    console.log('form', form.getValues());
  };

  return (
    <OrderDetailProvider form={form}>
      <Form {...form}>
        <form role="form" onSubmit={form.handleSubmit(handleSubmit, onError)}>
          <div className="page-content">
            <div className="page-content-spacing flex flex-row">
              <OrderDetailGeneralInfo />
              <OrderDetailDocumentCommonInfo />
            </div>
            <OrderDetailDocumentDetail />
            <div className="flex justify-end">
              <OrderDetailSummary />
            </div>
          </div>
        </form>
      </Form>
    </OrderDetailProvider>
  );
}
