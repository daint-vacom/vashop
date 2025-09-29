import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  editOrderSchema,
  EditOrderSchemaType,
} from '../../schemas/edit-order.schema';
import { OrderDetailDocumentCommonInfo } from './document-common-info';
import { OrderDetailDocumentDetail } from './document-detail';
import { OrderDetailGeneralInfo } from './general-info';

export function OrderDetailForm() {
  const form = useForm<EditOrderSchemaType>({
    resolver: zodResolver(editOrderSchema),
  });

  return (
    <div className="page-content">
      <div className="page-content-spacing flex flex-row">
        <OrderDetailGeneralInfo form={form} />
        <OrderDetailDocumentCommonInfo form={form} />
      </div>
      <OrderDetailDocumentDetail />
    </div>
  );
}
