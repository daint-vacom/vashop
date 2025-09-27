import { PropsWithChildren, useState } from 'react';
import { AuthContext } from '@/auth/context/auth-context';
import * as authHelper from '@/auth/lib/helpers';
import { AuthToken } from '@/models/auth.model';
import { IUser } from '@/models/user.model';
import { AuthAdapter } from '../adapters/auth-adapter';

export function AuthProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<AuthToken | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<IUser | undefined>();

  const verify = async () => {
    if (auth) {
      try {
        const user = await getUser();
        setCurrentUser(user || undefined);
      } catch {
        saveAuth(undefined);
        setCurrentUser(undefined);
      }
    }
  };

  const saveAuth = (auth: AuthToken | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const login = async (tenant: string, username: string, password: string) => {
    try {
      const auth = await AuthAdapter.login(tenant, username, password);
      saveAuth(auth.token);
      const user = await getUser();
      setCurrentUser(user);
    } catch (error) {
      saveAuth(undefined);
      throw error;
    }
  };

  const getUser = async () => {
    return await AuthAdapter.getCurrentUser();
  };

  const logout = async () => {
    await AuthAdapter.logout();
    saveAuth(undefined);
    setCurrentUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        auth,
        saveAuth,
        user: currentUser,
        setUser: setCurrentUser,
        login,
        getUser,
        logout,
        verify,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
