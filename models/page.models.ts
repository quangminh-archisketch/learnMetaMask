import { AppProps } from 'next/app';
import {
  PageSubModel,
  UserModel,
  UserPageTabModels,
  UserPageTabName,
  UserPageTabOrder,
  UserPageTabSetting,
} from './user.models';

export type AuthModel = {
  token?: string;
  user?: UserModel;
};

export type SeoPage = { title: string; descriptions: string; keywords: string; image: string };

export type PageProps = {
  auth?: AuthModel;
  seo?: SeoPage;
};

export type UserPageProps = AppProps &
  PageProps & {
    username: string;
    isExistUser: boolean;
    page: UserPageTabName;
    pageSub: PageSubModel;
    orderId: string | null;
    tabContent: UserPageTabOrder & UserPageTabSetting & UserPageTabModels;
  };
