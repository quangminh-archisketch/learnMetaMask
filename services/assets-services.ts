import apiHandler from 'api/api-handler';
import apiConstant from 'api/api-constants';
import { AssetFileType } from 'models/asset.models';

export type BodyGetModel = {
  type: 'all' | 'downloaded' | 'not-downloaded';
  keywords: string;
  sort: 'recently' | 'oldest' | 'az' | 'za' | 'lastweek' | 'lastmonth';
  offset: number;
  limit: number;
};

const assetsServices = {
  getModel: async (body: BodyGetModel) => {
    const resp = await apiHandler.create(apiConstant.assets, body);
    return resp;
  },

  download: async (productId: string, fileType: AssetFileType) => {
    const resp = await apiHandler.get(`${apiConstant.downloadAsset}/${productId}/${fileType}`);
    return resp.data;
  },

  downloadFree: async (productId: string, fileType: AssetFileType) => {
    const resp = await apiHandler.get(`${apiConstant.downloadFree}/${productId}/${fileType}`);
    return resp.data;
  },
};

export default assetsServices;
