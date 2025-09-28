export type ApiResponse<T> = {
  returnData: T;
};

export type ApiResponseWithPagination<T> = {
  total: number;
  pos: number;
  data: T[];
};

export type FilterCondition = {
  columnName: string;
  operator: string;
  value: string;
  columnType: 'string' | 'number' | 'date';
};

export type ApiRequestOption = {
  start?: number;
  count?: number;
  quickSearch?: string;
  filterConditions?: FilterCondition[];
  sort?: {
    selector: 'creationTime';
    desc: boolean;
  };
};
