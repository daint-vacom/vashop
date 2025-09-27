import { AuthToken } from '@/models/auth.model';
import { IUser, UserRole } from '@/models/user.model';
import { getData, setData } from '@/lib/storage';

const AUTH_LOCAL_STORAGE_KEY = `${import.meta.env.VITE_APP_NAME}-auth-v${
  import.meta.env.VITE_APP_VERSION || '1.0'
}`;

const ACTIVE_ROLE_LOCAL_STORAGE_KEY = `${import.meta.env.VITE_APP_NAME}-active_role-v${
  import.meta.env.VITE_APP_VERSION || '1.0'
}`;

/**
 * Get stored auth information from local storage
 */
const getAuth = (): AuthToken | undefined => {
  try {
    const auth = getData(AUTH_LOCAL_STORAGE_KEY) as AuthToken | undefined;
    return auth;
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error);
  }
};

/**
 * Save auth information to local storage
 */
const setAuth = (auth: AuthToken) => {
  setData(AUTH_LOCAL_STORAGE_KEY, auth);
};

/**
 * Remove auth information from local storage
 */
const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error);
  }
};

const hasRole = (user: IUser | null, role: UserRole): boolean => {
  return !!user?.roles.includes(role);
};

const hasAnyRole = (user: IUser | null, roles: UserRole[]): boolean => {
  return roles.some((r) => user?.roles.includes(r));
};

const getActiveRole = (): UserRole | undefined => {
  try {
    const role = getData(ACTIVE_ROLE_LOCAL_STORAGE_KEY) as UserRole | undefined;
    return role;
  } catch (error) {
    console.error('ACTIVE ROLE LOCAL STORAGE PARSE ERROR', error);
  }
};

const setActiveRole = (role: UserRole) => {
  setData(ACTIVE_ROLE_LOCAL_STORAGE_KEY, role);
};

export {
  AUTH_LOCAL_STORAGE_KEY,
  getAuth,
  removeAuth,
  setAuth,
  hasRole,
  hasAnyRole,
  getActiveRole,
  setActiveRole,
};
