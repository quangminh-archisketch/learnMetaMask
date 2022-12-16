import apiHandler from 'api/api-handler';
import apiConstant from 'api/api-constants';

const commonServices = {
  seoPage: async (page: string) => {
    const resp = await apiHandler.get(apiConstant.seo + '/' + page);
    return resp.data;
  },

  webSettings: async () => {
    const resp = await apiHandler.get(apiConstant.settings);
    return resp.data;
  },
};

export default commonServices;
