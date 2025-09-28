import { serverApiAxios } from '@/utilities/axios/server-api';
import {
  ApiRequestOption,
  ApiResponseWithPagination,
} from '@/utilities/axios/types';
import getOrderMapper from '../mappers/get-order.mapper';
import { IOrder } from '../models/order.model';
import { GetOrderSchemaType } from '../schemas/get-order.schema';

export const getOrderListApi = async (options?: ApiRequestOption) => {
  const response = await serverApiAxios.post<
    ApiResponseWithPagination<GetOrderSchemaType>
  >('/api/app/order/pages', options);

  return {
    ...response.data,
    data: response.data.data.map((item) => getOrderMapper(item)),
  } as ApiResponseWithPagination<IOrder>;
};
