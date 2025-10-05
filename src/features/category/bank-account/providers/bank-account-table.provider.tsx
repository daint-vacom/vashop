import React, { createContext, useContext } from 'react';
import { useBankAccountListQuery } from '../hooks/use-bank-account-list-query';

type BankAccountTableContextValue = ReturnType<
  typeof useBankAccountListQuery
> | null;

const BankAccountTableContext =
  createContext<BankAccountTableContextValue>(null);

export function BankAccountTableProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: BankAccountTableContextValue;
}) {
  return (
    <BankAccountTableContext.Provider value={value}>
      {children}
    </BankAccountTableContext.Provider>
  );
}

export function useBankAccountTable() {
  const ctx = useContext(BankAccountTableContext);
  if (!ctx) {
    throw new Error(
      'useBankAccountTable must be used within a BankAccountTableProvider',
    );
  }
  return ctx;
}
