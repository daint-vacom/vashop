import { z } from 'zod';

type DateRangeOptions = {
  startDateField: string;
  endDateField: string;
  message?: string;
};

export function withDateRangeValidation<T extends z.ZodTypeAny>(
  schema: T,
  options: DateRangeOptions,
) {
  return schema.superRefine((data, ctx) => {
    const start = (data as any)[options.startDateField];
    const end = (data as any)[options.endDateField];

    if (start && end && end < start) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          options.message ??
          'Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.',
        path: [options.endDateField],
      });
    }
  });
}
