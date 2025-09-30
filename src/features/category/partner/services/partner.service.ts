import { serverApiAxios } from '@/utilities/axios/server-api';
import {
  ApiRequestOption,
  ApiResponseWithPagination,
} from '@/utilities/axios/types';
import getCustomerMapper from '../mappers/partner.mapper';
import IPartner from '../models/partner.model';
import { GetPartnerSchemaType } from '../schemas/get-partner.schema';

export const getParnerListApi = async (options?: ApiRequestOption) => {
  const response = await serverApiAxios.post<
    ApiResponseWithPagination<GetPartnerSchemaType>
  >('/api/app/customer/pages', options);

  return {
    ...response.data,
    data: response.data.data.map((item) => getCustomerMapper(item)),
  } as ApiResponseWithPagination<IPartner>;
};
