import {
  ApiRequestOption,
  ApiResponseWithPagination,
} from '@/utilities/axios/types';
import { useQuery } from 'react-query';
import { IOrder } from '../../models/order.model';
import { getOrderListApi } from '../../services/order.service';

export function useOrderListQuery(option?: ApiRequestOption) {
  const key = ['orders', option?.start, option?.count, option?.quickSearch];

  return useQuery<ApiResponseWithPagination<IOrder>>({
    queryKey: key,
    queryFn: async () => {
      return await getOrderListApi({
        quickSearch: option?.quickSearch ?? '',
        filterConditions: [
          {
            columnName: 'voucherCode',
            columnType: 'string',
            operator: '=',
            value: 'DBH',
          },
        ],
        sort: {
          selector: 'creationTime',
          desc: true,
        },
        ...option,
      });
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });
}
