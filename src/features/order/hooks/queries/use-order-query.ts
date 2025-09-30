import { TimeParam } from '@/utilities/axios/params/time.param';
import {
  ApiRequestOption,
  ApiResponseWithPagination,
} from '@/utilities/axios/types';
import { useQuery } from 'react-query';
import { IOrder } from '../../models/order.model';
import { getOrderListApi } from '../../services/order.service';

export function useOrderListQuery(option?: ApiRequestOption & TimeParam) {
  const key = [
    'orders',
    option?.start,
    option?.count,
    option?.quickSearch,
    option?.time,
  ];

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
