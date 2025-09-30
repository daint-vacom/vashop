import { serverApiAxios } from '@/utilities/axios/server-api';
import {
  ApiRequestOption,
  ApiResponseWithPagination,
} from '@/utilities/axios/types';
import getBankAccountMapper from '../mappers/bank.mapper';
import IBankAccount from '../models/bank.model';
import { GetBankAccountSchemaType } from '../schemas/get-bank.schema';

export const getBankAccountListApi = async (options?: ApiRequestOption) => {
  const response = await serverApiAxios.post<
    ApiResponseWithPagination<GetBankAccountSchemaType>
  >('/api/app/bank/pages', options);

  return {
    ...response.data,
    data: response.data.data.map((item) => getBankAccountMapper(item)),
  } as ApiResponseWithPagination<IBankAccount>;
};
