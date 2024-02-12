import {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

export const requestInterceptor = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
  await Promise.reject(error);
};
