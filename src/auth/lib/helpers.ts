import { AuthToken } from '@/models/auth.model';
import { getData, setData } from '@/lib/storage';
import KEY_STORAGE from './config';

/**
 * Get stored auth information from local storage
 */
const getAuth = (): AuthToken | undefined => {
  try {
    const auth = getData(KEY_STORAGE.AUTH_TOKEN) as AuthToken | undefined;
    return auth;
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error);
  }
};

/**
 * Save auth information to local storage
 */
const setAuth = (auth: AuthToken) => {
  setData(KEY_STORAGE.AUTH_TOKEN, auth);
};

/**
 * Remove auth information from local storage
 */
const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(KEY_STORAGE.AUTH_TOKEN);
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error);
  }
};

export { getAuth, removeAuth, setAuth };
