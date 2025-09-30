export const TIME_RANGES = {
  ALL: '',
  TODAY: 'today',
  YESTERDAY: 'yesterday',
} as const;

export type TimeRange = (typeof TIME_RANGES)[keyof typeof TIME_RANGES];

export type TimeParam = {
  time?: TimeRange;
};

export const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  [TIME_RANGES.ALL]: 'Tất cả thời gian',
  [TIME_RANGES.TODAY]: 'Hôm nay',
  [TIME_RANGES.YESTERDAY]: 'Hôm qua',
};
