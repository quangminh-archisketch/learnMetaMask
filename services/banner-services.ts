import apiHandler from 'api/api-handler';
import apiConstant from 'api/api-constants';

const bannerServices = {
  getBanner: async () => {
    const resp = await apiHandler.create(`${apiConstant.banner}/list`, { status: true });

    return resp.data;
  },
};

export default bannerServices;
