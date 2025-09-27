import { AuthToken } from '@/models/auth.model';
import { ChangePasswordSchemaType } from '@/schemas/auth/change-password.schema';
import { SigninSchemaType } from '@/schemas/auth/signin.schema';
import { baseServerAxios, serverApiAxios } from '@/utilities/axios/server-api';
import { getTenantIdApi } from './tenant.service';

export const loginApi = async (schema: SigninSchemaType) => {
  const tenantId = await getTenantIdApi(schema.tenant);

  if (!tenantId) {
    throw new Error(`Không tìm thấy cửa hàng [${schema.tenant}]`);
  }

  const loginPayload = new URLSearchParams();
  loginPayload.append('username', schema.username);
  loginPayload.append('password', schema.password);
  loginPayload.append('client_id', 'VacomMartApi_App');
  loginPayload.append('scope', 'VacomMartApi offline_access');
  loginPayload.append('grant_type', 'password');

  const response = await baseServerAxios.post('/connect/token', loginPayload, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      __tenant: tenantId,
    },
  });

  return {
    tenantId,
    token: {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    } as AuthToken,
  };
};

export const logoutApi = async () => {
  return await serverApiAxios.post('/api/v1/auth/logout');
};

export const changePasswordApi = async (schema: ChangePasswordSchemaType) => {
  return serverApiAxios.post(`/api/v1/auth/changepassword`, schema);
};
