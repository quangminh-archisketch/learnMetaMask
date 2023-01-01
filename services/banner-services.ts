import apiHandler from 'api/api-handler';
import apiConstant from 'api/api-constants';

const bannerServices = {
  getBanner: async () => {
    const resp = await apiHandler.get(`${apiConstant.banner}`);

    return resp.data;
  },
};

export default bannerServices;
