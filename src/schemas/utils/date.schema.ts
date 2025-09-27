import { format, isValid, parse } from 'date-fns';
import z from 'zod';

export const dateSchema = z.preprocess(
  (val) => {
    if (val === null || val === undefined) return undefined as unknown as Date;
    console.log('Preprocessing date value:', val);
    if (typeof val === 'string') {
      if (!val.trim()) {
        return undefined as unknown as Date; // Treat empty string as missing
      }
      // Try dd/MM/yyyy first (legacy format)
      const parsedDMY = parse(val, 'dd/MM/yyyy', new Date());
      if (isValid(parsedDMY) && format(parsedDMY, 'dd/MM/yyyy') === val) {
        return parsedDMY;
      }

      // Try ISO datetime / RFC formats
      const isoCandidate = new Date(val);
      if (!Number.isNaN(isoCandidate.getTime())) {
        return isoCandidate;
      }

      // Let z.date() handle invalid formats
      return val;
    }
    // If a number (timestamp) was provided, convert to Date
    if (typeof val === 'number') {
      const d = new Date(val);
      if (!Number.isNaN(d.getTime())) return d;
      return val;
    }
    return val;
  },
  z.date({
    invalid_type_error: 'Ngày không hợp lệ.',
    required_error: 'Không được để trống.',
  }),
);
