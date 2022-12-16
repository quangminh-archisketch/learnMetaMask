import { OrderStatusType } from './order.model';
import { ReviewModel } from './review.models';

export type MarketUserType = {
  name: string;
  nickname: string;
};

export type AssetModel = {
  id: string;
  downloaded: boolean;
  status: number;
  item_id: string;
  user_id: string;
  market_item: AssetMarketItem;
  market_order?: {
    id: string;
    order_no: number;
    status: OrderStatusType;
    is_free: boolean;
  };
  createdAt: string;
  updatedAt: string | null;
  market_user: MarketUserType;
  license: {
    title: string;
    link: string;
    description: string;
    is_free: string;
    id: string;
  };
};

export type AssetMarketItem = {
  id: string;
  image: string;
  title: string;
  is_animated: boolean;
  market_license?: {
    title: string;
    description: string;
    link: string;
    is_free: boolean;
  };
  is_pbr: boolean;
  is_rigged: boolean;
  file_details: AssetFileType[];
  market_reviews?: ReviewModel[];
  market_user: MarketUserType;
};

export type AssetFileType =
  | 'FBX'
  | 'MB'
  | 'MAX'
  | 'BLEND'
  | 'STL'
  | 'GOZ'
  | 'SPP'
  | 'OBJ'
  | 'GLB'
  | 'USDZ'
  | 'GLTF';
