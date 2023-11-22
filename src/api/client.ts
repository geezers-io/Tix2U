import axios from 'axios';
import { injectServiceKey, logRequest } from '@/api/interceptors/request';
import { logError, logResponse, parseXMLResponse, unwrapResponse } from '@/api/interceptors/response';
import { flow } from '@/utils/flow';

export const axiosInstance = axios.create({
  baseURL: `/api`,
  timeout: 100000,
  validateStatus: status => status >= 200 && status < 400,
});

axiosInstance.interceptors.request.use(flow([injectServiceKey, logRequest]));
axiosInstance.interceptors.response.use(flow([parseXMLResponse, logResponse, unwrapResponse]), logError);
