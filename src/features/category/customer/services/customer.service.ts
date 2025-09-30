import { serverApiAxios } from '@/utilities/axios/server-api';
import {
  ApiRequestOption,
  ApiResponseWithPagination,
} from '@/utilities/axios/types';
import getCustomerMapper from '../mappers/customer.mapper';
import ICustomer from '../models/customer.model';
import { GetCustomerSchemaType } from '../schemas/get-customer.schema';

export const getCustomerListApi = async (options?: ApiRequestOption) => {
  const response = await serverApiAxios.post<
    ApiResponseWithPagination<GetCustomerSchemaType>
  >('/api/app/customer/pages', options);

  return {
    ...response.data,
    data: response.data.data.map((item) => getCustomerMapper(item)),
  } as ApiResponseWithPagination<ICustomer>;
};
