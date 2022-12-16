import { Aggregate } from 'models';

export type HelpModel = {
  id: string;
  title: string;
  image: string;
  content: string;
  market_category_help: HelpCategory;
};

export type HelpCategory = {
  id: string;
  title: string;
  orderid: number;
  description: string;
  icon?: string;
  market_helps_aggregate?: Aggregate;
};
