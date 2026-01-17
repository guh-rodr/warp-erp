import axios, { AxiosError, AxiosRequestConfig } from 'axios';

interface ApiErrorResponse {
  statusCode: number;
  error: string;
  message?: string;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let refreshPromise: Promise<void> | null = null;

// interceptador para lidar com erros de autenticação/autorização
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (originalRequest?._retry) {
      return Promise.reject(error);
    }

    if (originalRequest?.url?.includes('/auth/refresh')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      if (['TokenExpired', 'TokenMissing'].includes(error.response.data?.error)) {
        originalRequest._retry = true;

        try {
          if (!refreshPromise) {
            refreshPromise = api
              .post('/auth/refresh')
              .then(() => {})
              .catch((err) => {
                throw err;
              })
              .finally(() => {
                refreshPromise = null;
              });
          }

          await refreshPromise;

          return api(originalRequest);
        } catch (refreshError) {
          if (!window.location.pathname.includes('/auth/login')) {
            window.location.href = '/auth/login';
          }
          return Promise.reject(refreshError);
        }
      }

      if (error.response.data.error === 'TokenInvalid') {
        if (!window.location.pathname.includes('/auth/login')) {
          window.location.href = '/auth/login';
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
