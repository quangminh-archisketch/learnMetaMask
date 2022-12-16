import apiHandler from 'api/api-handler';
import apiConstant from 'api/api-constants';

const categoryServices = {
  /**
   * Category
   **/

  getAllCategory: async () => {
    const resp = await apiHandler.get(apiConstant.category);

    return resp.data;
  },
};

export default categoryServices;
