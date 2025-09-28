export const SCHEMA_MESSAGES = {
  REQUIRED: 'Không được để trống.',
  INVALID: 'Giá trị không hợp lệ.',
  MIN_LENGTH: (min: number) => `Tối thiểu ${min} ký tự.`,
  MAX_LENGTH: (max: number) => `Tối đa ${max} ký tự.`,
  MIN_VALUE: (min: number) => `Giá trị phải lớn hơn hoặc bằng ${min}.`,
  MAX_VALUE: (max: number) => `Giá trị phải bé hơn hoặc bằng ${max}.`,
};
