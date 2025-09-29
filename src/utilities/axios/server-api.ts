import { getAuth, removeAuth, setAuth } from '@/features/auth/lib/helpers';
import axios from 'axios';
import { convertDatesToISODate, convertISOStringsToDates } from '@/lib/date';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const BASE_URL = import.meta.env.VITE_APP_API_URL;

const processQueue = (error: any, token: string | null = null) => {
  refreshSubscribers.forEach((callback) => {
    if (error) {
      callback(error);
    } else if (token) {
      callback(token);
    }
  });
  refreshSubscribers = [];
};

const onRefreshed = (token: string) => {
  processQueue(null, token);
};

const baseServerAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

const serveAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  // Leave headers undefined to let Axios set proper header type
  headers: undefined as any,
});

serveAxios.interceptors.request.use((config) => {
  // Attach Bearer token from local storage when available
  try {
    const auth = getAuth();
    if (auth?.accessToken) {
      // Ensure headers is an object we can index into. Use any to satisfy Axios types.
      config.headers = config.headers ?? ({} as any);
      // Ensure we don't overwrite an existing Authorization header
      if (!('Authorization' in (config.headers as Record<string, any>))) {
        (config.headers as Record<string, string>)['Authorization'] =
          `Bearer ${auth.accessToken}`;
      }
    }
  } catch (error) {
    // silent fail - attaching token is best-effort
    // console.error('Failed to attach auth token to request', error);
  }
  if (config.data && !(config.data instanceof FormData)) {
    config.data = convertDatesToISODate(config.data);
  }
  return config;
});

serveAxios.interceptors.response.use(
  (response) => {
    try {
      // Nếu response là blob/binary (ví dụ khi tải file), không cố parse JSON/strings
      const respType = response?.config?.responseType;
      const isBlob = respType === 'blob' || response?.data instanceof Blob;

      if (!isBlob && response && response.data) {
        response.data = convertISOStringsToDates(response.data);
      }
    } catch (err) {
      // nếu parse lỗi, không block response — trả về nguyên gốc
    }
    return response;
  },
  async (error) => {
    // Nếu response lỗi từ server có payload chứa các ISO string, parse luôn để dễ xử lý lỗi ở client
    try {
      if (error?.response?.data) {
        error.response.data = convertISOStringsToDates(error.response.data);
      }
    } catch (err) {
      // ignore
    }

    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            resolve(serveAxios(originalRequest));
          });
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      const refreshToken = getAuth()?.refreshToken;
      if (!refreshToken) {
        removeAuth();
        window.location.href = '/login';
        return Promise.reject(new Error('No refresh token available.'));
      }
      try {
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', refreshToken);
        params.append('client_id', 'VacomMartApi_App');
        const { data: tokenData } = await axios.post(
          `${BASE_URL}/connect/token`,
          params,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
        );
        setAuth({
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
        });
        serveAxios.defaults.headers.common['Authorization'] =
          'Bearer ' + tokenData.access_token;
        originalRequest.headers['Authorization'] =
          'Bearer ' + tokenData.access_token;
        onRefreshed(tokenData.access_token);
        return serveAxios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error.response?.data || error);
  },
);

export { baseServerAxios, serveAxios as serverApiAxios };
