import { axiosInstance } from '@/api/client';
import { PerformanceClient } from '@/api/services/PerformanceService.types';

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
