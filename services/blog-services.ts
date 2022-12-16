import { AxiosRequestConfig } from 'axios';

import apiHandler from 'api/api-handler';
import apiConstant from 'api/api-constants';

export type GetBlogBody = { category?: string; title?: string };

const blogServices = {
  getAllCategoryBlog: async (body?: AxiosRequestConfig) => {
    const resp = await apiHandler.get(apiConstant.categoryBlog, body);
    return resp.data;
  },
  getList: async (body?: GetBlogBody) => {
    const resp = await apiHandler.create(apiConstant.blog, body);
    return resp.data;
  },
  getDetail: async (id: string, body?: AxiosRequestConfig) => {
    const resp = await apiHandler.get(apiConstant.blogDetail + '/' + id, body);
    return resp.data;
  },
  getArticleRelate: async (id: string, category: string, length: number) => {
    const resp = await apiHandler.get(
      apiConstant.blogDetail + '/related/' + id + '/' + category + '/' + length
    );
    return resp.data;
  },
};

export default blogServices;
