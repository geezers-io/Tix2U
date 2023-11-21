import { PerformanceClient } from './PerformanceService.types';
import { axiosInstance } from '../client';

const ROUTE = 'pblprfr';

export const PerformanceService: PerformanceClient = {
  getList: async request => {
    return await axiosInstance.get(`${ROUTE}`, {
      params: request,
    });
  },
  getDetail: async ({ mt20id }) => {
    return await axiosInstance.get(`${ROUTE}/${mt20id}`);
  },
};
