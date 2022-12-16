import apiHandler from 'api/api-handler';
import apiConstant from 'api/api-constants';

import { BodyOrder, ParamReview, ParamWithdraw } from 'models/seller.model';

const sellerServices = {
  getProfile: async (id: string) => {
    const resp = await apiHandler.get(`${apiConstant.seller}/${id}`);

    return resp.data;
  },

  getProduct: async (id: string, limit: number, offset: number) => {
    const resp = await apiHandler.create(`${apiConstant.seller}/${id}/${limit}/${offset}`, {});

    return resp.data;
  },

  getAllOrder: async (limit: number, offset: number, body?: BodyOrder | {}) => {
    const resp = await apiHandler.create(`${apiConstant.seller}/order/${limit}/${offset}`, body);

    return resp.data;
  },

  getOrderDetail: async (id: string) => {
    const resp = await apiHandler.create(`${apiConstant.seller}/order/${id}`, {});

    return resp.data;
  },

  getLatestReview: async (limit: number) => {
    const resp = await apiHandler.get(`${apiConstant.seller}/latest-review/${limit}`);

    return resp.data;
  },

  getMyModes: async (limit: number, offset: number, body?: any) => {
    const resp = await apiHandler.create(`${apiConstant.seller}/${limit}/${offset}`, body || {});

    return resp.data;
  },

  getTotalAmount: async () => {
    const resp = await apiHandler.get(`${apiConstant.seller}/total-amount`);

    return resp.data;
  },

  getWithdraw: async (limit: number, offset: number, body?: any) => {
    const resp = await apiHandler.create(`${apiConstant.withdraw}/${limit}/${offset}`, body || {});

    return resp.data;
  },

  getWithdrawDetail: async (id: string) => {
    const resp = await apiHandler.get(`${apiConstant.withdraw}/${id}`);

    return resp.data;
  },

  getMinWithdraw: async () => {
    const resp = await apiHandler.get(`${apiConstant.withdraw}/min-withdraw`);

    return resp.data;
  },

  createWithdraw: async (body: ParamWithdraw) => {
    const resp = await apiHandler.create(apiConstant.withdraw, body);

    return resp.data;
  },

  getReviews: async (limit: number, offset: number, body?: ParamReview | null) => {
    const resp = await apiHandler.create(
      `${apiConstant.seller}/reviews/${limit}/${offset}`,
      body || {}
    );

    return resp.data;
  },
  deleteProduct: async (productId: string) => {
    const resp = await apiHandler.delete(apiConstant.products + '/' + productId);
    return resp.data;
  },

  getStatistical: async (body?: any) => {
    const resp = await apiHandler.create(`${apiConstant.seller}/statistical`, body || {});

    return resp.data;
  },
};

export default sellerServices;
