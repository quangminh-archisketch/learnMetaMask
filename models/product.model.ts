import { CategoryModel } from './category.models';
import { License } from './license.models';
import { UserModel } from './user.models';

export type ProductModel = {
  id: string;
  title: string;
  image: string;
  market_item_galleries: {
    id: string;
    image: string;
  }[];
  old_price?: number | null;
  price: number;
  demo: string;
  demo_usdz?: string;
  model: string;
  viewer_bg?: string;
  config_3d_viewer?: Record<string, string | number>;
  tags?: string;
  status: number;

  cat_id: string;
  market_category?: CategoryModel;
  market_item_categories?: { market_category: CategoryModel }[];

  license_id?: string;
  market_license?: License;

  viewed_count: number;
  bought_count?: number;
  totalComment?: number;
  totalReview: number;
  avgReview?: number;

  like_count: number;
  market_likes?: {
    user_id: string;
  }[];

  author_id: null | string;
  market_user?: UserModel;

  file_details?: (
    | 'FBX'
    | 'MAX'
    | 'BLEND'
    | 'STL'
    | 'GOZ'
    | 'SPP'
    | 'GLB'
    | 'USDZ'
    | 'GLTF'
    | 'OBJ'
  )[];
  files: { [key: string]: string };

  unit: 1 | 2 | 3;
  dimensions: string;
  materials: string;
  is_animated: boolean;
  color: string;
  is_uv: boolean;
  is_pbr: boolean;
  is_rigged: boolean;
  description: string;
  geometry: {
    quads: string;
    triangles: string;
    total_triangles: string;
  } | null;
  textures: string;
  vertices: string;
  quads: string;
  total_triangles: string;

  seo_title?: string;
  seo_description?: string;

  createdAt?: string;

  market_reviews_aggregate: {
    aggregate: {
      count: number;
      avg: {
        rate: 5;
      };
    };
  };
};
