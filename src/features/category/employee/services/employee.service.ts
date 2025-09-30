import { serverApiAxios } from '@/utilities/axios/server-api';
import {
  ApiRequestOption,
  ApiResponseWithPagination,
} from '@/utilities/axios/types';
import getEmployeeMapper from '../mappers/employee.mapper';
import IEmployee from '../models/employee.model';
import { GetEmployeeSchemaType } from '../schemas/get-employee.schema';

export const getEmployeeListApi = async (options?: ApiRequestOption) => {
  const response = await serverApiAxios.post<
    ApiResponseWithPagination<GetEmployeeSchemaType>
  >('/api/app/employee/pages', options);

  return {
    ...response.data,
    data: response.data.data.map((item) => getEmployeeMapper(item)),
  } as ApiResponseWithPagination<IEmployee>;
};
