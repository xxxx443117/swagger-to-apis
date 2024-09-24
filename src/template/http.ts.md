```ts
import axios, { AxiosRequestConfig } from 'axios';
import { isSuccess } from './util';

export const STORAGE_SID = 'STORAGE_SID';

interface AxiosRequestConfigCustom extends AxiosRequestConfig {
  hideHttpError?: boolean;
  ignoreSID?: boolean; // 是否忽略SID
}

const baseURL = '/';

axios.defaults.timeout = 30 * 1000;

axios.interceptors.response.use(
  (response) => {
    if (response.data) {
      return response;
    }
    return Promise.reject(response);
  },
  (error) => {
    return Promise.reject(error.response);
  },
);

export class Http {
  async request(configs: AxiosRequestConfigCustom) {
    let response;
    const SID = localStorage.getItem(STORAGE_SID);

    try {
      response = await axios({
        ...configs,
        headers:
          SID && !configs.ignoreSID
            ? { ...configs.headers, SID }
            : configs.headers,
      });
      return response.data;
    } catch (e: unknown) {
      return e;
    }
  }

  async get(
    url: string,
    params?: unknown,
    option: AxiosRequestConfigCustom = {},
  ) {
    const config: AxiosRequestConfigCustom = {
      method: 'GET',
      url,
      baseURL,
      params,
      ...option,
    };
    return this.request(config);
  }

  async getOther(
    otherBaseURL: string,
    url: string,
    params?: unknown,
    option: AxiosRequestConfigCustom = { ignoreSID: true },
  ) {
    const config: AxiosRequestConfigCustom = {
      method: 'GET',
      url,
      baseURL: otherBaseURL,
      params,
      ...option,
    };
    return this.request(config);
  }

  async post(
    url: string,
    data?: unknown,
    params?: unknown,
    option: AxiosRequestConfigCustom = {},
  ) {
    const config: AxiosRequestConfigCustom = {
      method: 'POST',
      url,
      data,
      baseURL,
      ...option,
    };
    return this.request(config);
  }
  async put(
    url: string,
    data?: unknown,
    params?: unknown,
    option: AxiosRequestConfigCustom = {},
  ) {
    const config: AxiosRequestConfigCustom = {
      method: 'PUT',
      url,
      data,
      baseURL,
      ...option,
    };
    return this.request(config);
  }

  async delete(
    url: string,
    data?: unknown,
    params?: unknown,
    option: AxiosRequestConfigCustom = {},
  ) {
    const config: AxiosRequestConfigCustom = {
      method: 'DELETE',
      url,
      data,
      baseURL,
      ...option,
    };
    return this.request(config);
  }
  async patch(
    url: string,
    data?: unknown,
    params?: unknown,
    option: AxiosRequestConfigCustom = {},
  ) {
    const config: AxiosRequestConfigCustom = {
      method: 'PATCH',
      url,
      data,
      baseURL,
      ...option,
    };
    return this.request(config);
  }
  async head(
    url: string,
    params?: unknown,
    option: AxiosRequestConfigCustom = {},
  ) {
    const config: AxiosRequestConfigCustom = {
      method: 'HEAD',
      url,
      params,
      baseURL,
      ...option,
    };
    return this.request(config);
  }
  async options(
    url: string,
    params?: unknown,
    option: AxiosRequestConfigCustom = {},
  ) {
    const config: AxiosRequestConfigCustom = {
      method: 'OPTIONS',
      url,
      params,
      baseURL,
      ...option,
    };
    return this.request(config);
  }

  static checkSuccess(res: Api.Error) {
    return isSuccess(res);
  }
}
```
