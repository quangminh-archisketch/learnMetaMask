import apiHandler from 'api/api-handler';
import apiConstant from 'api/api-constants';

const licenseServices = {
  download: async (productId: string) => {
    const resp = await apiHandler.get(`${apiConstant.downloadLicense}/${productId}`);
    return resp.data;
  },

  getList: async (isFree?: boolean) => {
    const resp = await apiHandler.create(
      apiConstant.license + '/list',
      typeof isFree === 'boolean' ? { is_free: isFree } : {}
    );
    return resp.data;
  },
};

export default licenseServices;
