import apiHandler from 'api/api-handler';
import apiConstant from 'api/api-constants';

const authServices = {
  login: async (body: { taiKhoan: string; matKhau: string }) => {
    const resp = await apiHandler.create(apiConstant.login + '/DangNhap', body);
    return resp.data;
  },

  register: async (body: {
    taiKhoan: string;
    matKhau: string;
    email: string;
    soDt: string;
    maNhom: string;
    hoTen: string;
  }) => {
    const resp = await apiHandler.create(apiConstant.login, body);
    return resp.data;
  },

  logout: async () => {
    const resp = await apiHandler.get(apiConstant.logout);
    return resp.data;
  },
};

export default authServices;
