import apiHandler from 'api/api-handler';
import apiConstant from 'api/api-constants';

export type CreateSessionBody = {
  customer_email: string;
  items: { id: string; title: string; image: string; price: number; old_price?: number }[];
  coupon_id: string;
  use_credit: boolean;
  paygate?: 'stripe' | 'paypal';
};

const checkoutServices = {
  getCart: async () => {
    const resp = await apiHandler.get(apiConstant.checkout + '/cart');
    return resp.data;
  },

  addToCart: async (productId: string) => {
    const resp = await apiHandler.create(apiConstant.checkout + '/cart', { item_id: productId });
    return resp.data;
  },

  removeProductCart: async (productCartId: string) => {
    const resp = await apiHandler.delete(apiConstant.checkout + '/deleteCart/' + productCartId);
    return resp.data;
  },

  getCoupon: async (code: string) => {
    const resp = await apiHandler.create(apiConstant.coupon + '/useCoupon', { coupon: code });
    return resp.data;
  },

  createSession: async (body: CreateSessionBody) => {
    const resp = await apiHandler.create(apiConstant.checkout + '/session', body);
    return resp.data;
  },

  cancelOrder: async (order_id: string) => {
    const resp = await apiHandler.create(apiConstant.checkout + '/cancel-payment', { order_id });
    return resp.data;
  },

  confirmOrder: async (body: {
    payment_intent: string;
    customer_email: string;
    coupon_id?: string;
  }) => {
    const resp = await apiHandler.create(apiConstant.checkout + '/confirm-payment', body);
    return resp.data;
  },
};

export default checkoutServices;
