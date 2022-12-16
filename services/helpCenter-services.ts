import apiHandler from 'api/api-handler';
import apiConstant from 'api/api-constants';
import { AxiosRequestConfig } from 'axios';

export type BodySearchArticle = {
  category?: string;
  title?: string;
};

const helpCenterServices = {
  getList: async () => {
    const resp = await apiHandler.get(apiConstant.helpCenter);
    return resp.data;
  },
  getDetail: async (id: string, body?: AxiosRequestConfig) => {
    const resp = await apiHandler.get(apiConstant.helpCenter + '/' + id, body);
    return resp.data;
  },
  searchArticle: async (body?: BodySearchArticle) => {
    const resp = await apiHandler.create(apiConstant.helpCenter + '/category', body);
    return resp.data;
  },
  getCollection: async () => {
    const resp = await apiHandler.get(apiConstant.helpCollection);
    return resp.data;
  },
  getCollectionDetail: async (collectionId: string, body?: AxiosRequestConfig) => {
    const resp = await apiHandler.get(apiConstant.helpCollection + '/' + collectionId, body);
    return resp.data;
  },
};

export default helpCenterServices;
