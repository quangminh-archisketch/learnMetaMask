export type OrderStatusType = 1 | 2 | 3 | 4 | 5 | 6;

export type OrderModel = {
  id: string;
  order_no: string;
  status: OrderStatusType;
  items: ProductOrderModel[];
  subtotal: number;
  discount: number;
  amount: number;
  payment_note?: string;
  market_coupon?: {
    prefix: string;
    code: string;
    type: 'price' | 'percent';
    value: number;
  };
  payment_method: string;
  paidAt: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductOrderModel = {
  id: string;
  title: string;
  image: string;
  old_price?: number;
  price: number;
};
