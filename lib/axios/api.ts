import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import {
  errorInterceptor,
  requestInterceptor,
  successInterceptor,
} from "./interceptors";

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(successInterceptor, errorInterceptor);

export { api };
