import { OnChangeFn, PaginationState } from '@tanstack/react-table';

export interface ServerSideTableProps<T> {
  data?: T[];
  totalCount?: number;
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  isLoading?: boolean;
  // Optional quick search value and setter for server-side search
  search?: string | undefined;
  onSearchChange?: (value: string) => void;
}
