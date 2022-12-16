import apiHandler from 'api/api-handler';
import apiConstant from 'api/api-constants';

export type ParamCreateUser = {
  taiKhoan: string;
  email: string;
  matKhau: string;
  name: string;
  soDt: string;
  maNhom: string;
  hoTen: string;
};

const userServices = {
  register: async (body: ParamCreateUser) => {
    const resp = await apiHandler.create(apiConstant.register + '/DangKy', body);
    return resp.data;
  },
};

export default userServices;
