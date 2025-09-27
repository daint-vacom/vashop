import { AuthToken } from '@/models/auth.model';
import { ChangePasswordSchemaType } from '@/schemas/auth/change-password.schema';
import { serverApiAxios } from '@/utilities/axios/server-api';
import axios from 'axios';

export const loginApi = async ({
  userName,
  password,
}: {
  userName: string;
  password: string;
}) => {
  const url = `${import.meta.env.VITE_APP_API_URL}/api/v1/auth/login`;
  const response = await axios.post(url, {
    userName,
    password,
  });
  return {
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token,
  } as AuthToken;
};

export const logoutApi = async () => {
  return await serverApiAxios.post('/api/v1/auth/logout');
};

export const changePasswordApi = async (schema: ChangePasswordSchemaType) => {
  return serverApiAxios.post(`/api/v1/auth/changepassword`, schema);
};
