import { z } from 'zod';

export const getSigninSchema = z.object({
  tenant: z.string().min(1, { message: 'Vui lòng nhập mã cửa hàng.' }),
  username: z.string().min(1, { message: 'Vui lòng nhập tên đăng nhập.' }),
  password: z.string().min(1, { message: 'Vui lòng nhập mật khẩu.' }),
});

export type SigninSchemaType = z.infer<typeof getSigninSchema>;
