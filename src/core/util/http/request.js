import axios from "axios";
import { FORM_DATA_REQUIRED_URLS, HEADER_NOT_REQUIRED_URLS } from "./urls";

const baseURL = process.env.REACT_APP_BASE_URL;
const http = axios.create({
  // withCredentials: true,
  timeout: 1000000,
  headers: {
    "Content-Type": "application/json",
  },
  baseURL,
});

http.interceptors.request.use((config) => {
  // const token = localStorage.getItem("ACCESS_TOKEN");
  // config.headers.set(
  //   'Authorization',
  //   !HEADER_NOT_REQUIRED_URLS.includes(config.url || '')
  //     ? token
  //       ? `Bearer ${token}`
  //       : undefined
  //     : undefined,
  // );
  config.headers.set(
    'Content-Type',
    FORM_DATA_REQUIRED_URLS.includes(config.url || '')
      ? 'multipart/form-data'
      : 'application/json',
  );
  return config;
},
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use();

export const apiRequest = {
  get: (url, params) => http.get(url, { ...params }),
  post: (url, data) => http.post(url, data),
  postFormData: (url, formData) => http.post(url, formData),
  patchFormData: (url, formData) => http.patch(url, formData),
  patch: (url, data) => http.patch(url, data),
  putFormData: (url, formData) => http.put(url, formData),
  put: (url, data) => http.put(url, data),
  delete: (url, data) => http.delete(url, data),
};