import z from 'zod';

export const scoreSchema = z.coerce
  .number({ message: 'Điểm không hợp lệ.' })
  .min(0, { message: 'Điểm phải lớn hơn hoặc bằng 0.' })
  .max(10, { message: 'Điểm phải bé hơn hoặc bằng 10.' });
