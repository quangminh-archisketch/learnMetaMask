import { CategoryModel } from 'models/category.models';
import { ProductCartModel } from 'models/checkout.models';
import { AuthModel } from 'models/page.models';
import { BannerModel } from 'models/banner.models';
import { FilmReducer } from 'models/film-models';

export type CartReduxModel = {
  products?: ProductCartModel[];
  coupon?: {
    id: string;
    code: string;
    value: number;
  };
};

export type WebsiteSettingsModel = {
  facebook?: string;
  youtube?: string;
  instagram?: string;
  twitter?: string;
  behance?: string;
  pinterest?: string;
  artstation?: string;
};

export type TypeOrderActionModel = 'cancel' | 'cancel-success' | null;
export type DataOrderActionModel = { id: string; order_no?: string; payment_note?: string };
export type OrderActionModel = {
  type?: TypeOrderActionModel;
  order?: DataOrderActionModel;
};

export type AppStateWeb = {
  setting?: WebsiteSettingsModel;
  categories?: CategoryModel[];
  notificationBar?: boolean;
  movingPage?: boolean;
  notificationTotal?: number;
  banner?: BannerModel;
  share?: { link: string };
};

export type AppStateModal = {
  search: boolean;
  menuMobile: boolean;
  cartPreview: boolean;
  share?: { open: boolean; link: string };
  sellerRegister: boolean;
  isCloseBanner: boolean;
};

export type AppState = {
  film: FilmReducer;
  web: AppStateWeb;
  modal: AppStateModal;
  auth?: AuthModel;
  cart: CartReduxModel;
  order?: OrderActionModel;
};
