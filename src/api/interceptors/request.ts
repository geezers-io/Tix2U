import { InternalAxiosRequestConfig } from 'axios';
import { printRequestLog } from '@/utils/log';

export function injectServiceKey(config: InternalAxiosRequestConfig) {
  if (!config.params) config.params = {};
  config.params['service'] = import.meta.env.VITE_API_key; // 브라우저에서 접근 가능할 수 밖에 없는 값이기에 env 로 따로 빼지 않음
  return config;
}

export function logRequest(config: InternalAxiosRequestConfig) {
  printRequestLog({
    method: config.method,
    endPoint: config.url,
    requestParams: config.params,
    requestData: config.data,
    config,
  });

  return config;
}
