import axios, { AxiosRequestConfig } from 'axios';

export const TokenTitle = 'token';
const baseURL = `https://mcbookserver.iran.liara.run/api`;
// const baseURL = `http://localhost:6060/api`;

const axiosDefaultConfigs: AxiosRequestConfig = {
  baseURL,
};

const createAxiosConfig = (config:
AxiosRequestConfig): AxiosRequestConfig => ({ ...config });

// eslint-disable-next-line import/no-mutable-exports
export let axiosInstance = axios.create(createAxiosConfig(axiosDefaultConfigs));

export const updateAxiosInstance = (newToken? : string) => {
  const token = newToken || localStorage.getItem(TokenTitle);

  if (token) {
    axiosInstance = axios.create({
      ...axiosDefaultConfigs,
      headers: {
        ...axiosDefaultConfigs.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    return;
  }
  axiosInstance = axios.create({
    ...axiosDefaultConfigs,
  });
};

export const setToken = (token: string) => {
  localStorage.setItem(TokenTitle, token);
  updateAxiosInstance(token);
};

export const removeToken = () => {
  localStorage.removeItem(TokenTitle);
  updateAxiosInstance();
};

export const getToken = () => localStorage.getItem(TokenTitle);
