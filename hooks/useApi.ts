import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";

const apiClient = axios.create({
  baseURL: "/api/proxy",
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const useApi = () => {
  const get = useCallback(
    async <T>(url: string, config?: AxiosRequestConfig) => {
      const response = await apiClient.get<T>(url, config);
      return response.data;
    },
    []
  );

  const post = useCallback(
    async <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
      const response = await apiClient.post<T>(url, data, config);
      return response.data;
    },
    []
  );

  const put = useCallback(
    async <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
      const response = await apiClient.put<T>(url, data, config);
      return response.data;
    },
    []
  );

  const del = useCallback(
    async <T>(url: string, config?: AxiosRequestConfig) => {
      const response = await apiClient.delete<T>(url, config);
      return response.data;
    },
    []
  );

  const getFile = useCallback(
    async (
      url: string,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<Blob>> => {
      const response = await apiClient.get<Blob>(url, {
        ...config,
        responseType: "blob",
      });
      return response;
    },
    []
  );

  return { get, post, put, del, getFile };
};
