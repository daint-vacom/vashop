import React, { createContext, useContext } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { EditOrderSchemaType } from '../schemas/edit-order.schema';

type OrderDetailContextType = {
  form: UseFormReturn<EditOrderSchemaType>;
};

const OrderDetailContext = createContext<OrderDetailContextType | undefined>(
  undefined,
);

export function OrderDetailProvider({
  children,
  form,
}: {
  children: React.ReactNode;
  form: UseFormReturn<EditOrderSchemaType>;
}) {
  return (
    <OrderDetailContext.Provider value={{ form }}>
      {children}
    </OrderDetailContext.Provider>
  );
}

export function useOrderDetail() {
  const ctx = useContext(OrderDetailContext);
  if (!ctx) {
    throw new Error('useOrderDetail must be used within OrderDetailProvider');
  }
  return ctx;
}

export default OrderDetailProvider;
