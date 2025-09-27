import { AuthToken } from '@/models/auth.model';
import { IUser } from '@/models/user.model';
import { jwtDecode } from 'jwt-decode';
import { loginApi, logoutApi } from '@/services/auth.service';
import { getAuth } from '../lib/helpers';

export const AuthAdapter = {
  login: async (userName: string, password: string): Promise<AuthToken> => {
    try {
      const token = await loginApi({ userName, password });
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
    if (!payload?.id || !payload?.username) {
      throw new Error('Invalid token payload');
    }

    return {
      id: payload.id,
      userName: payload.username,
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
