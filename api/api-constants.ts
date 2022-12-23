import config from 'config';

const API_ROOT = config.apiRoot;

const apiConstant = Object.freeze({
  // Auth
  login: `${API_ROOT}/api/QuanLyNguoiDung`,
  logout: `${API_ROOT}/users/logout`,
  register: `${API_ROOT}/api/QuanLyNguoiDung`,

  //Banner
  banner: `${API_ROOT}/api//QuanLyPhim/LayDanhSachBanner`,
});

export default apiConstant;
