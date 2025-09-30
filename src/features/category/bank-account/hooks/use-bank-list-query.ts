import { useQuery } from 'react-query';
import IBank from '../models/bank.model';
import { getBankListApi } from '../services/bank.service';

export function useBankListQuery() {
  return useQuery<IBank[]>({
    queryKey: ['banks'],
    queryFn: getBankListApi,
    retry: 0,
    refetchOnWindowFocus: false,
  });
}
