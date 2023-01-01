import apiHandler from 'api/api-handler';
import apiConstant from 'api/api-constants';

const filmServices = {
  getFilm: async () => {
    const resp = await apiHandler.get(`${apiConstant.film}/LayDanhSachPhim`);

    return resp.data;
  },

  getDetail: async (id: number) => {
    const resp = await apiHandler.get(apiConstant.film + '/LayThongTinPhim' + `?MaPhim=${id}`);
    return resp.data;
  },
};

export default filmServices;
