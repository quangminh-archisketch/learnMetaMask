import { ProductModel } from './product.model';

export type BlogModel = {
  id: string;
  title: string;
  sumary: string;
  content: string;
  image: string;
  banner: string;
  hashtag?: string[];
  items?: BlogProductAttach[];
  seo_title?: string;
  seo_description?: string;
  market_category_blog: BlogCategory;
  createdAt: string;
  idCategory: string;
};

export type BlogCategory = {
  id: string;
  title: string;
  status: boolean;
  orderid: number;
};

export type BlogProductAttach = ProductModel & {
  link: string;
};
