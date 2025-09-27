import { IUser } from '@/models/user.model';
import { jwtDecode } from 'jwt-decode';
import { loginApi, logoutApi } from '@/services/auth.service';
import { getAuth } from '../lib/helpers';

export const AuthAdapter = {
  login: async (tenant: string, username: string, password: string) => {
    try {
      const token = await loginApi({ tenant, username, password });
      return token;
    } catch (error) {
      throw error;
    }
  },

  register: async () => {
    throw new Error('Registration is disabled in mock mode');
  },

  getCurrentUser: async (): Promise<IUser> => {
    const token = getAuth();
    if (!token) throw new Error('Not logged in');
    const payload = jwtDecode(token.accessToken) as any;
    console.log('Decoded JWT payload:', payload);
    if (!payload?.tenantid || !payload?.preferred_username) {
      throw new Error('Invalid token payload');
    }

    return {
      tenantId: payload.tenantid,
      username: payload.preferred_username,
    };
  },

  logout: async () => {
    await logoutApi();
  },

  requestPasswordReset: async () => {
    console.warn('Mock: password reset requested');
  },

  resetPassword: async () => {
    console.warn('Mock: password reset');
  },

  resendVerificationEmail: async () => {
    console.warn('Mock: resend verification');
  },
};
