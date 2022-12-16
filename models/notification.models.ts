import { ProductModel } from './product.model';
import { UserModel } from './user.models';

export type NotificationModel = {
  id: string;
  is_read: boolean;
  content: string;
  time: string;
  type: number;
  createdAt: string;
  market_item: ProductModel;
  market_user_sender: UserModel;
};
