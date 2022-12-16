import apiHandler from 'api/api-handler';
import apiConstant from 'api/api-constants';

const homepageServices = {
  getData: async () => {
    const resp = await apiHandler.get(apiConstant.homepage);
    return resp.data;
  },
  getFeatured: async () => {
    const resp = await apiHandler.get(apiConstant.featured);
    return resp.data;
  },
};

export default homepageServices;
