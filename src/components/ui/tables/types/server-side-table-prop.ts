import { OnChangeFn, PaginationState } from '@tanstack/react-table';

export interface ServerSideTableProps<T> {
  data?: T[];
  totalCount?: number;
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
}
