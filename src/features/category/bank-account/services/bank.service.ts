import { serverApiAxios } from '@/utilities/axios/server-api';
import {
  ApiRequestOption,
  ApiResponseWithPagination,
} from '@/utilities/axios/types';
import getBankAccountMapper from '../mappers/bank-account.mapper';
import getBankMapper from '../mappers/bank.mapper';
import IBankAccount from '../models/bank-account.model';
import { EditBankAccountSchemaType } from '../schemas/edit-bank-account.schema';
import { GetBankAccountSchemaType } from '../schemas/get-bank-account.schema';
import { GetBankSchemaType } from '../schemas/get-bank-schema';

export const getBankListApi = async () => {
  const response = await serverApiAxios.get<GetBankSchemaType[]>(
    '/api/app/bank/bank-connect',
  );

  return response.data.map((item) => getBankMapper(item));
};

export const getBankAccountListApi = async (options?: ApiRequestOption) => {
  const response = await serverApiAxios.post<
    ApiResponseWithPagination<GetBankAccountSchemaType>
  >('/api/app/bank/pages', options);

  return {
    ...response.data,
    data: response.data.data.map((item) => getBankAccountMapper(item)),
  } as ApiResponseWithPagination<IBankAccount>;
};

export const addBankAccountApi = async (payload: EditBankAccountSchemaType) => {
  return await serverApiAxios.post('/api/app/bank', payload);
};

export const editBankAccountApi = async (
  id: string,
  payload: EditBankAccountSchemaType,
) => {
  return await serverApiAxios.put(`/api/app/bank/${id}`, {
    ...payload,
    id: id,
  });
};

export const deleteBankAccountApi = async (id: string) => {
  return await serverApiAxios.delete(`/api/app/bank/${id}`);
};
