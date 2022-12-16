import apiHandler from 'api/api-handler';
import apiConstant from 'api/api-constants';

const paramUrl = {
  endDate: '{end_date}',
  orderId: '{order_id}',
};

export type BodyGetOrder = {
  type: 'all' | '0' | '1' | '2' | '4' | '5' | '6';
  keySearch: string | 'null';
  offset: number;
  limit: number;
};

const orderServices = {
  getOrders: async (param: BodyGetOrder) => {
    const resp = await apiHandler.get(
      `${apiConstant.orders}/${param.type}/${param.keySearch}/${param.limit}/${param.offset}`
    );
    return resp;
  },

  getOrderDetail: async (orderId: string) => {
    const resp = await apiHandler.get(apiConstant.orders.slice(0, -1) + '/' + orderId);
    return resp.data;
  },

  cancelOrder: async (orderId: string, reason: string) => {
    const resp = await apiHandler.update(apiConstant.orderCancel + '/' + orderId, { reason });
    return resp.data;
  },
};

export default orderServices;
