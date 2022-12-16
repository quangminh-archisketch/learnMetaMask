import apiHandler from 'api/api-handler';
import apiConstant from 'api/api-constants';

type FileFormat = 'FBX' | 'MAX' | 'BLEND' | 'STL' | 'GOZ' | 'SPP' | 'GLB' | 'USDZ' | 'GLTF' | 'OBJ';
export type BodyFilterProductModel = {
  title?: string;
  category?: string[];
  minPrice: number;
  maxPrice: number;
  format: FileFormat[];
  is_pbr?: boolean;
  is_animated?: boolean;
  is_rigged?: boolean;
  sort_by: 'createdAt' | 'viewed_count' | 'bought_count' | 'price';
  sort_type: 'asc' | 'desc';
  offset: number;
  limit: number;
};

const offsetParam = '{offset}',
  limitParam = '{limit}';

const productServices = {
  getProductPopular: async (offset: number, limit: number) => {
    const resp = await apiHandler.get(
      apiConstant.productPopular
        .replace(offsetParam, offset.toString())
        .replace(limitParam, limit.toString())
    );
    return {
      status: resp.status,
      error: resp.data.error,
      message: resp.data.message,
      data: resp.data.data,
    };
  },

  getProductNewest: async (offset: number, limit: number) => {
    const resp = await apiHandler.get(
      apiConstant.productNewest
        .replace(offsetParam, offset.toString())
        .replace(limitParam, limit.toString())
    );
    return {
      status: resp.status,
      error: resp.data.error,
      message: resp.data.message,
      data: resp.data.data,
    };
  },

  filterProducts: async (body: BodyFilterProductModel) => {
    const resp = await apiHandler.create(apiConstant.productFilter, body);
    return {
      status: resp.status,
      error: resp.data.error,
      message: resp.data.message,
      data: resp.data.data,
      total: resp.data.total,
    };
  },

  getProductSale50: async (offset: number, limit: number) => {
    const resp = await apiHandler.get(apiConstant.productsSale50 + '/' + limit + '/' + offset);
    return { ...resp.data, status: resp.status };
  },

  getProductDetail: async (id: string) => {
    const resp = await apiHandler.get(`${apiConstant.products}/${id}`);

    return resp.data;
  },

  getProductRelated: async (productID: string, category_ids: string[], limit: number) => {
    const resp = await apiHandler.get(`${apiConstant.productsRelated}/${productID}/${limit}`, {
      params: { category_ids },
    });

    return resp.data;
  },

  addProduct: async (body: any) => {
    const resp = await apiHandler.create(apiConstant.products, body);
    return resp.data;
  },

  updateProduct: async (productId: string, body: any) => {
    const resp = await apiHandler.update(apiConstant.products + '/' + productId, body);

    return resp.data;
  },

  getLinkS3: async (body: { filename: string; kind: 'private' | 'public' }) => {
    const resp = await apiHandler.create(apiConstant.media + '/presigned', body);
    return resp.data;
  },
};

export default productServices;
