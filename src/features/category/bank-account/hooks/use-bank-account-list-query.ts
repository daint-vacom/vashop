import { useCallback } from 'react';
import {
  ApiRequestOption,
  ApiResponseWithPagination,
} from '@/utilities/axios/types';
import { useMutation } from '@tanstack/react-query';
import { showToast } from '@/lib/toast';
import { UseMutationProps } from '@/lib/types/mutation';
import { useApiPagination } from '@/hooks/queries/use-api-pagination';
import IBankAccount from '../models/bank-account.model';
import { EditBankAccountSchemaType } from '../schemas/edit-bank-account.schema';
import {
  addBankAccountApi,
  editBankAccountApi,
  getBankAccountListApi,
} from '../services/bank.service';

type UseBankAccountTableOptions = Parameters<
  typeof useApiPagination<IBankAccount, unknown>
>[1];

type Fetcher = (
  opts?: ApiRequestOption,
) => Promise<ApiResponseWithPagination<IBankAccount>>;

export function useBankAccountListQuery({
  fetch = getBankAccountListApi,
  options,
}: { fetch?: Fetcher; options?: UseBankAccountTableOptions } = {}) {
  const defaultOptions = {
    defaultPageSize: 5,
    queryKeyBase: 'banks',
    syncWithUrl: true,
  };
  const mergedOptions = { ...defaultOptions, ...options };

  const {
    pagination,
    setPagination,
    search,
    setSearch,
    apiOptions,
    data,
    total,
    isLoading,
    query,
    refetch,
    filters,
    setFilter,
  } = useApiPagination<IBankAccount, unknown>(fetch, mergedOptions);

  const setBankFilter = useCallback(
    (bankCode: string | undefined) => {
      console.log('Setting bank filter:', bankCode);
      if (!bankCode) {
        setFilter('bankCode', undefined);
      } else {
        setFilter('bankCode', {
          columnName: 'bankCode',
          columnType: 'string',
          operator: '=',
          value: bankCode,
        });
      }
    },
    [setFilter],
  );

  return {
    pagination,
    setPagination,
    search,
    setSearch,
    apiOptions,
    data,
    total,
    isLoading,
    query,
    refetch,
    filters,
    setBankFilter,
  } as const;
}

export function useAddBankAccountMutation({
  onSuccess,
  onError,
}: UseMutationProps = {}) {
  return useMutation<
    Awaited<ReturnType<typeof addBankAccountApi>>,
    Error,
    EditBankAccountSchemaType
  >({
    mutationFn: addBankAccountApi,
    onSuccess: () => {
      showToast({
        mode: 'success',
        message: 'Thêm tài khoản ngân hàng thành công!',
      });
      onSuccess?.();
    },
    onError: (error) => {
      console.error('Mutation Error:', error);
      showToast({
        mode: 'destructive',
        message: 'Thêm tài khoản ngân hàng thất bại!',
      });
      onError?.(error);
    },
  });
}

export function useEditBankAccountMutation({
  onSuccess,
  onError,
}: UseMutationProps = {}) {
  return useMutation<
    Awaited<ReturnType<typeof editBankAccountApi>>,
    Error,
    { id: string; payload: EditBankAccountSchemaType }
  >({
    mutationFn: ({ id, payload }) => editBankAccountApi(id, payload),
    onSuccess: () => {
      showToast({
        mode: 'success',
        message: 'Chỉnh sửa tài khoản ngân hàng thành công!',
      });
      onSuccess?.();
    },
    onError: (error) => {
      console.error('Mutation Error:', error);
      showToast({
        mode: 'destructive',
        message: 'Chỉnh sửa tài khoản ngân hàng thất bại!',
      });
      onError?.(error);
    },
  });
}
