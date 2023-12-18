import { InternalAxiosRequestConfig } from 'axios';
import { printRequestLog } from '@/utils/log';

export function injectServiceKey(config: InternalAxiosRequestConfig) {
  if (!config.params) config.params = {};
  config.params['service'] = process.env.NEXT_PUBLIC_API_KEY; // 브라우저에서 접근 가능할 수 밖에 없는 값이기에 env 로 따로 빼지 않음
  return config;
}

export function logRequest(config: InternalAxiosRequestConfig) {
  printRequestLog({
    method: 'http://kopis.or.kr',
    endPoint: config.baseURL,
    requestParams: config.params,
    requestData: config.data,
    config,
  });

  return config;
}
