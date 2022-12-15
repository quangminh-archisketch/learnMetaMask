import config from '../config'

const API_SERVER = config.apiServer

const apiConstant = Object.freeze({
  //User
  login: `${API_SERVER}/api/QuanLyNguoiDung/DangNhap`,
})

export default apiConstant
