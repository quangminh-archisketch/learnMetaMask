import { AuthModel } from './page.models';

//Data
export type UserModel = {
  id: string;
  nickname: string;
  email: string;
  name: string;
  image: string;
  work?: string;
  website?: string;
  location?: string;
  introduce?: string;
  softwares?: string[];
  skills?: string[];
  email_subscription: boolean;
  status: boolean;
  market_users_change_emails: UserChangeEmailModel[];
  market_seller_wallet: {
    avalible: number;
  };
  is_seller: boolean;
  createdAt: string;
  position?: string;
};

export type UserChangeEmailModel = {
  email: string;
};

//Page
export type UserPageTabName = 'my-orders' | 'models' | 'coins' | 'settings' | 'likes';
export type PageSubModel = 'detail' | 'cancel';
export type UserPageTabOrder = 'all' | 'success' | 'refund' | null;
export type UserPageTabSetting = 'profile' | 'email' | 'change-password' | 'notification' | null;
export type UserPageTabModels = 'all' | 'downloaded' | 'not-downloaded' | null;
export type UserPageTabCoins = 'all' | 'received' | 'used' | null;

export type UserPageOptionFilterModel =
  | 'recently'
  | 'oldest'
  | 'lastweek'
  | 'lastmonth'
  | 'az'
  | 'za';

export type UserPageOrderProps = {
  tabName: UserPageTabOrder;
};

export type UserPageSettingProps = {
  tabName: UserPageTabSetting;
  auth: AuthModel;
};

export type UserPageMyModelsProps = {
  tabName: UserPageTabModels;
};

export type UserPageCoinsProps = {
  tabName: UserPageTabCoins;
};

export type UserPageLikesProps = {
  auth: AuthModel;
};
