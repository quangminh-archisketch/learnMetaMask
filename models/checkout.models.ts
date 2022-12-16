import { CartReduxModel } from 'store/type';
import { AuthModel } from './page.models';
import { ProductModel } from './product.model';
import { UserModel } from './user.models';

export type CheckoutProps = {
  auth?: AuthModel;
  dataCart: CartReduxModel;
  bodyCreateOrder: any;
  onShowLoading: () => void;
};

export type ProductCartModel = {
  id: string;
  amount: number;
  market_item: ProductModel;
  market_user: UserModel;
};

export type CouponModel = {
  id: string;
  prefix: string;
  code: string;
  type: 'percent' | 'price';
  value: number;
  min_order?: number;
  max_discount?: number;
};
