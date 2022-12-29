import apiHandler from 'api/api-handler';
import apiConstant from 'api/api-constants';

const theaterServices = {
  getTheater: async () => {
    const resp = await apiHandler.get(`${apiConstant.theater}/LayThongTinLichChieuHeThongRap`);

    return resp.data;
  },
};

export default theaterServices;
